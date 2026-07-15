const QuizAttempt = require("../../../models/QuestionAttempt");

const getAllAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      attempts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAttempt = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.id)
      .populate("userId", "name email")
      .populate("answers.questionId");

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found",
      });
    }

    res.json(attempt);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


const deleteAttempt = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.id);

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found",
      });
    }

    await attempt.deleteOne();

    res.json({
      message: "Attempt deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports={
    getAllAttempts,
    getAttempt,deleteAttempt
}