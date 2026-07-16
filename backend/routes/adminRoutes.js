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
const {
    login,signup,profile,dashboard
}=require("../controller/admin/admin");

const {
    addQuestion,
    getAllQuestions,
    updateQuestion,
    singleQuestion,
    deleteQuestion
}=require("../controller/admin/question/questions");

router.post("/admin/signup",signup );

router.post("/admin/login", login);

router.get("/admin/profile", verifyUser, profile);


// Questions api 
router.post("/admin/questions",verifyUser,addQuestion);
router.get("/admin/questions", verifyUser,getAllQuestions );
router.get("/admin/questions/:id", verifyUser,singleQuestion);
router.put("/admin/questions/:id", verifyUser,updateQuestion);

router.delete("/admin/questions/:id",verifyUser,deleteQuestion);

router.get("/admin/dashboard",verifyUser,dashboard);
router.get("/admin/users", verifyUser, getAllUsers);

router.get("/admin/users/:id", verifyUser, getUser);

router.put("/admin/users/:id", verifyUser, updateUser);

router.delete("/admin/users/:id", verifyUser, deleteUser);



router.get("/admin/attempts", verifyUser, getAllAttempts);

router.get("/admin/attempts/:id", verifyUser, getAttempt);

router.delete("/admin/attempts/:id", verifyUser, deleteAttempt);


module.exports = router;


