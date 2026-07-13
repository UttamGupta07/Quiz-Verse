const router = require('express').Router();
const { verifyUser } = require('../middleware/authMiddleware');
const Question = require('../models/Question');
const QuizAttempt = require("../models/QuestionAttempt");


router.get("/quiz/categories", verifyUser, async (req, res) => {
    try {
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
    catch (err) {
        res.status(500).json({ error: err.message });
    }

})

router.get("/quiz/categories/:category/subcategories", verifyUser, async (req, res) => {
    try {
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
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/quiz/random", async (req, res) => {
    try {
        const { category, subCategory, difficulty, limit } = req.query;

        const match = {};

        if (category) match.category = category;
        if (subCategory) match.subCategory = subCategory;
        if (difficulty) match.difficulty = difficulty;

        const questions = await Question.aggregate([
            { $match: match },
            {
                $sample: {
                    size: Number(limit) || 10
                }
            }
        ]);

        res.status(200).json({
            success: true,
            count: questions.length,
            questions
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
router.post("/quiz/submit", verifyUser, async (req, res) => {
    try {
        const {
            category,
            subCategory,
            difficulty,
            totalQuestions,
            timeTaken,
            answers,
        } = req.body;

        // Get all attempted question ids
        const questionIds = Object.keys(answers);

        // Fetch all attempted questions in ONE query
        const questions = await Question.find({
            _id: { $in: questionIds },
        });

        let correctAnswers = 0;
        const answerDetails = [];

        questions.forEach((question) => {
            const selectedAnswer = answers[question._id.toString()];

            const isCorrect = selectedAnswer === question.correctAnswer;

            if (isCorrect) {
                correctAnswers++;
            }

            answerDetails.push({
                questionId: question._id,
                selectedAnswer,
                isCorrect,
            });
        });

        const attempted = questionIds.length;
        const wrongAnswers = attempted - correctAnswers;
        const skipped = totalQuestions - attempted;

        const score = correctAnswers;

        const percentage = Number(
            ((score / totalQuestions) * 100).toFixed(2)
        );

        const quizAttempt = await QuizAttempt.create({
            userId: req.user.id,

            category,
            subCategory,
            difficulty,

            totalQuestions,

            correctAnswers,
            wrongAnswers,

            score,

            percentage,

            timeTaken,

            answers: answerDetails,
        });

        return res.status(201).json({
            success: true,
            message: "Quiz submitted successfully.",

            result: {
                attemptId: quizAttempt._id,
                score,
                totalQuestions,
                correctAnswers,
                wrongAnswers,
                skipped,
                percentage,
                timeTaken,
            },

            quizAttempt,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }


})
router.get("/quiz/review/:id", verifyUser, async (req, res) => {
    try {
        const { id } = req.params;

        const review = await QuizAttempt.findOne({
            _id: id,
            userId: req.user.id,
        }).populate("answers.questionId");

        if (!review) {
            return res.status(404).json({
                msg: "Quiz attempt not found",
            });
        }

        res.status(200).json({
            msg: "Review fetched successfully",
            review,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Server Error",
            error: err.message,
        });
    }
});
router.get(
    "/quiz/result/:id",
    verifyUser,
    async (req, res) => {

        try {

            const quiz = await QuizAttempt.findOne({
                _id: req.params.id,
                userId: req.user.id
            });

            if (!quiz) {
                return res.status(404).json({
                    message: "Quiz not found"
                });
            }

            res.json(quiz);

        } catch (err) {

            res.status(500).json({
                message: err.message
            });

        }
    });

module.exports = router;
