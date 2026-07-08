const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["Development", "Aptitude", "GK-GS"],
    },

    subCategory: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length === 4,
        message: "Question must have exactly 4 options.",
      },
    },

    correctAnswer: {
      type: String,
      required: true,
    }
    

     
  },
  {
    timestamps: true,
  }
);

module.exports= mongoose.model("Question", questionSchema);