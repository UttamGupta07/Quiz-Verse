const express=require("express");
const app=express();
const dotenv=require("dotenv");
const userRoutes=require("./routes/userRoutes");
const adminRoutes=require("./routes/adminRoutes");

dotenv.config();
app.use(express.json());
require("./db/db");
app.listen(process.env.PORT,()=>{
    console.log(("Server started!"));
    
});
app.use("/",userRoutes);
app.use("/",adminRoutes);

