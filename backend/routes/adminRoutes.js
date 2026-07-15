const router = require('express').Router();
const Admin = require('../models/Admin');
const Question = require('../models/Question'); 
const QuizAttempt = require('../models/QuestionAttempt'); 
const User = require('../models/User'); 
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { verifyUser } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/admin/userController/userController");
const {
    getAllAttempts,
    getAttempt,deleteAttempt
}=require("../controller/admin/quizController/quizController");

router.post("/admin/signup", async (req, res) => {
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
});

router.post("/admin/login", async (req, res) => {
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



});

router.get("/admin/profile", verifyUser, async (req, res) => {
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
});


// Questions api 
router.post("/admin/questions",verifyUser,async (req, res) => {
    console.log(req.body);
    
    const { category, subCategory, difficulty, question, options, correctAnswer } = req.body;
    if (!category || !subCategory || !difficulty || !question || !options || !correctAnswer) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    try {
        const newQuestion = await Question.create({
            category,
            subCategory,
            difficulty,
            question,
            options,
            correctAnswer
        });
        res.status(201).json({
            msg: "Question created successfully",
            question: newQuestion
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/admin/questions", verifyUser, async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json({
            success: true,
            questions
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/admin/questions/:id", verifyUser, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }
        res.status(200).json({
            success: true,
            question
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.put("/admin/questions/:id", verifyUser, async (req, res) => {
    const { category, subCategory, difficulty, question, options, correctAnswer } = req.body;
    if (!category || !subCategory || !difficulty || !question || !options || !correctAnswer) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    const { id } = req.params;
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(id, {
            category,
            subCategory,
            difficulty,
            question,
            options,
            correctAnswer
        });
        if (!updatedQuestion) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }
        await updatedQuestion.save();
        res.status(200).json({
            success: true,
            message: "Question updated successfully",
            question: updatedQuestion
        });
    }  
catch (err) {
        res.status(500).json({ error: err.message });
    }    
});

router.delete("/admin/questions/:id", verifyUser, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedQuestion = await Question.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }   
        res.status(200).json({
            success: true,
            message: "Question deleted successfully"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
});

router.get("/admin/dashboard",verifyUser, async (req, res) => {
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
}
);
router.get("/admin/users", verifyUser, getAllUsers);

router.get("/admin/users/:id", verifyUser, getUser);

router.put("/admin/users/:id", verifyUser, updateUser);

router.delete("/admin/users/:id", verifyUser, deleteUser);



router.get("/admin/attempts", verifyUser, getAllAttempts);

router.get("/admin/attempts/:id", verifyUser, getAttempt);

router.delete("/admin/attempts/:id", verifyUser, deleteAttempt);


module.exports = router;


