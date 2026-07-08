import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    selectedAnswer: {
      type: String,
      required: true,
    },

    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const quizAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    correctAnswers: {
      type: Number,
      required: true,
    },

    wrongAnswers: {
      type: Number,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
    },

    timeTaken: {
      type: Number, // seconds
      required: true,
    },

    answers: [answerSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("QuizAttempt", quizAttemptSchema);