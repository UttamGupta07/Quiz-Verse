const router=require('express').Router();
const Question=require('../models/Question');


router.get("/quiz/categories",async(req,res)=>{
    try{
        const categories = await Question.aggregate([
    {
        $group: {
            _id: "$category",
            totalQuestions: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            category: "$_id",
            totalQuestions: 1
        }
    }
]);
      res.status(200).json(categories);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }

})

router.get("/quiz/categories/:category/subcategories",async(req,res)=>{
    try{
        const subCategories = await Question.aggregate([
    {
        $match: {
            category: req.params.category
        }
    },
    {
        $group: {
            _id: "$subCategory",
            totalQuestions: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            subCategory: "$_id",
            totalQuestions: 1
        }
    }
]);
  res.status(200).json(subCategories);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});

module.exports=router;
