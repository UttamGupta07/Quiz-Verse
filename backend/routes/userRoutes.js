 const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { verifyUser } = require("../middleware/authMiddleware");
const QuizAttempt=require("../models/QuestionAttempt");


// USER SIGNUP
 

router.post("/user/signup", async (req, res) => {
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
});


 
// USER LOGIN
 

router.post("/user/login", async (req, res) => {

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

});


 
// USER PROFILE
 

router.get("/user/profile", verifyUser, async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

});
router.get("/user/dashboard", verifyUser,async (req, res) => {
  try {
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
});


module.exports = router;