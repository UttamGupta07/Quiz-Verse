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


const getAllQuestions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category,
      subCategory,
      difficulty,
    } = req.query;

    // Build filter object
    const filter = {};

    // Search
    if (search.trim() !== "") {
      filter.$or = [
        { question: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { subCategory: { $regex: search, $options: "i" } },
      ];
    }

    // Category Filter
    if (category && category !== "All") {
      filter.category = category;
    }

    // SubCategory Filter
    if (subCategory && subCategory !== "All") {
      filter.subCategory = subCategory;
    }

    // Difficulty Filter
    if (difficulty && difficulty !== "All") {
      filter.difficulty = difficulty;
    }

    const currentPage = Number(page);
    const pageLimit = Number(limit);

    const totalQuestions = await Question.countDocuments(filter);

    const questions = await Question.find(filter)
      .sort({ createdAt: -1 }) // newest first
      .skip((currentPage - 1) * pageLimit)
      .limit(pageLimit);

    res.status(200).json({
      success: true,
      questions,
      currentPage,
      totalPages: Math.ceil(totalQuestions / pageLimit),
      totalQuestions,
      hasNextPage: currentPage < Math.ceil(totalQuestions / pageLimit),
      hasPrevPage: currentPage > 1,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
      error: err.message,
    });
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
 const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
 
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    await Question.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports={
    addQuestion,
    getAllQuestions,
    updateQuestion,
    singleQuestion,
    deleteQuestion
}