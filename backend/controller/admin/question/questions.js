const Question=require("../../../models/Question");

const addQuestion=async (req, res) => {
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
};

const getAllQuestions=async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json({
            success: true,
            questions
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const singleQuestion=async (req, res) => {
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
};
const updateQuestion=async (req, res) => {
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
};
const deleteQuestion= async (req, res) => {
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
};
module.exports={
    addQuestion,
    getAllQuestions,
    updateQuestion,
    singleQuestion,
    deleteQuestion
}