const express=require("express");
const app=express();
const dotenv=require("dotenv");
const userRoutes=require("./routes/userRoutes");
const adminRoutes=require("./routes/adminRoutes");
const quizRoutes=require("./routes/quizRoutes");
const cors=require("cors");
const Question=require("./models/Question");

dotenv.config();
app.use(express.json());
app.use(cors());
require("./db/db");
app.listen(process.env.PORT,()=>{
    console.log(("Server started!"));
    
});
app.post("/addmany",async(req,res)=>{
    const r=await Question.insertMany(req.body);
    console.log(r);
    res.status(201).json("created");
    
})

app.use("/",userRoutes);
app.use("/",adminRoutes);
app.use("/",quizRoutes);

