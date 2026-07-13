const mongoose=require("mongoose");
const Question=require("../models/Question");
require("dotenv");

const db=async()=>{
     await mongoose.connect(process.env.DB).then(()=>{
        console.log("Database conneected");
        
    }).catch((err)=>{
        console.log(err);
        
    })
};

db();
