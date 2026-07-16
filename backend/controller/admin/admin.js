const QuizAttempt=require("../../models/QuestionAttempt");
const Question=require("../../models/Question");
const Admin=require("../../models/Admin");
const User=require("../../models/User");
const bcrypt = require("bcrypt");

const generateToken = require("../../utils/generateToken");


const signup=async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const isExist = await Admin.findOne({ email: email })
        if (isExist) {
            return res.status(400).json({ error: "Admin already exist" });

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully",

            admin: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email
            }
        });


    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

const login=async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ error: "Admin not found" });

        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = generateToken(admin._id, admin.email);
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        }

        )
    } catch (err) {
        res.status(500).json({ error: err.message })
    }



};

const profile=async (req, res) => {
    try {
        const admin = await Admin.findOne({ _id: req.user.id }).select("-password");
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }
        res.status(200).json({
            success: true,
            admin
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const dashboard=async (req, res) => {
  try {
    // Run queries in parallel
    const [
      totalUsers,
      totalQuestions,
      totalAttempts,
      categories,
      subCategories,
      average,
      mostPlayed,
      recentAttempts,
      recentUsers,
    ] = await Promise.all([
      User.countDocuments(),

      Question.countDocuments(),

      QuizAttempt.countDocuments(),

      Question.distinct("category"),

      Question.distinct("subCategory"),

      QuizAttempt.aggregate([
        {
          $group: {
            _id: null,
            averageScore: { $avg: "$percentage" },
          },
        },
      ]),

      QuizAttempt.aggregate([
        {
          $group: {
            _id: "$category",
            total: { $sum: 1 },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
        {
          $limit: 1,
        },
      ]),

      QuizAttempt.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("userId", "name")
        .select(
          "userId category subCategory score percentage createdAt"
        ),

      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email createdAt"),
    ]);

    res.status(200).json({
      totalUsers,
      totalQuestions,
      totalCategories: categories.length,
      totalSubCategories: subCategories.length,
      totalAttempts,

      averageScore:
        average.length > 0
          ? average[0].averageScore.toFixed(2)
          : 0,

      mostPlayedCategory:
        mostPlayed.length > 0
          ? mostPlayed[0]._id
          : "N/A",

      recentAttempts,
      recentUsers,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports={
    login,
    signup,
    profile,
    dashboard,
}