 const router = require("express").Router();
const bcrypt = require("bcrypt");

const generateToken = require("../utils/generateToken");
const User = require("../models/User");
const { verifyUser } = require("../middleware/authMiddleware");
const QuizAttempt=require("../models/QuestionAttempt");
const {
  userLogin,
  userSignup,
  userProfile,
  userDashboard,
} =require("../controller/user/user");



 

router.post("/user/signup",userSignup );


 
 

router.post("/user/login", userLogin);


 

 

router.get("/user/profile", verifyUser, userProfile );
router.get("/user/dashboard", verifyUser,userDashboard);


module.exports = router;