const User=require("../../models/User");
const QuizAttempt=require("../../models/QuestionAttempt");
const bcrypt = require("bcrypt");

const generateToken = require("../../utils/generateToken");

const userDashboard=async (req, res) => {
  try {
    const user=await User.findById(req.user.id);

    const attempts = await QuizAttempt.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    const totalQuizzes = attempts.length;

    let highestScore = 0;
    let totalPercentage = 0;
    let totalCorrect = 0;
    let totalQuestions = 0;

    attempts.forEach((quiz) => {
      if (quiz.percentage > highestScore) {
        highestScore = quiz.percentage;
      }

      totalPercentage += quiz.percentage;
      totalCorrect += quiz.correctAnswers;
      totalQuestions += quiz.totalQuestions;
    });

    const averageScore =
      totalQuizzes === 0
        ? 0
        : (totalPercentage / totalQuizzes).toFixed(2);

    const accuracy =
      totalQuestions === 0
        ? 0
        : ((totalCorrect / totalQuestions) * 100).toFixed(2);

    res.status(200).json({
      name:user.name,
      totalQuizzes,
      highestScore,
      averageScore,
      accuracy,
      recentAttempts: attempts.slice(0, 2),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const userLogin=async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }

        const token = generateToken(user._id,user.email);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

}

const userSignup=async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
}
const userProfile=  async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const attempts = await QuizAttempt.find({
      userId: req.user.id,
    });

    let totalQuestions = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let totalScore = 0;
    let bestScore = 0;

    attempts.forEach((attempt) => {
      totalQuestions += attempt.totalQuestions;
      correctAnswers += attempt.correctAnswers;
      wrongAnswers += attempt.wrongAnswers;
      totalScore += attempt.score;

      if (attempt.score > bestScore) {
        bestScore = attempt.score;
      }
    });

    res.status(200).json({
      user,
      stats: {
        totalQuizzes: attempts.length,
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        totalScore,
        bestScore,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
};

module.exports={
  userLogin,
  userSignup,
  userProfile,
  userDashboard,
}