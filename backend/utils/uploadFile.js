 const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");
const Question = require("../models/question");

const upload = multer({
    dest: "uploads/",
});

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const rows = [];

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", (row) => {
                rows.push(row);
            })
            .on("end", async () => {
                try {
                    const validQuestions = [];
                    const invalidRows = [];
                    const duplicateRows = [];

                    // Valid values
                    const categories = [
                        "Development",
                        "Aptitude",
                        "GK-GS",
                    ];

                    const difficulties = [
                        "Easy",
                        "Medium",
                        "Hard",
                    ];

                    // Duplicate inside CSV
                    const csvSet = new Set();

                    // Existing Questions from DB
                    const existingQuestions = await Question.find(
                        {},
                        "question category subCategory"
                    );

                    const dbSet = new Set();

                    existingQuestions.forEach((q) => {
                        dbSet.add(
                            `${q.question.trim().toLowerCase()}-${q.category}-${q.subCategory}`
                        );
                    });

                    rows.forEach((row, index) => {
                        const rowNumber = index + 2;

                        // Trim values
                        Object.keys(row).forEach((key) => {
                            if (row[key]) {
                                row[key] = row[key].trim();
                            }
                        });

                        // Required fields
                        if (
                            !row.category ||
                            !row.subCategory ||
                            !row.difficulty ||
                            !row.question ||
                            !row.option1 ||
                            !row.option2 ||
                            !row.option3 ||
                            !row.option4 ||
                            !row.correctAnswer
                        ) {
                            invalidRows.push({
                                row: rowNumber,
                                reason: "Missing required field",
                            });
                            return;
                        }

                        // Category validation
                        if (!categories.includes(row.category)) {
                            invalidRows.push({
                                row: rowNumber,
                                reason: "Invalid category",
                            });
                            return;
                        }

                        // Difficulty validation
                        if (!difficulties.includes(row.difficulty)) {
                            invalidRows.push({
                                row: rowNumber,
                                reason: "Invalid difficulty",
                            });
                            return;
                        }

                        const options = [
                            row.option1,
                            row.option2,
                            row.option3,
                            row.option4,
                        ];

                        // Unique options
                        if (new Set(options).size !== 4) {
                            invalidRows.push({
                                row: rowNumber,
                                reason: "Options must be unique",
                            });
                            return;
                        }

                        // Correct answer
                        if (!options.includes(row.correctAnswer)) {
                            invalidRows.push({
                                row: rowNumber,
                                reason:
                                    "Correct answer not present in options",
                            });
                            return;
                        }

                        // Duplicate inside CSV
                        const csvKey = `${row.question.toLowerCase()}-${row.category}-${row.subCategory}`;

                        if (csvSet.has(csvKey)) {
                            duplicateRows.push({
                                row: rowNumber,
                                reason: "Duplicate question in CSV",
                            });
                            return;
                        }

                        csvSet.add(csvKey);

                        // Duplicate in Database
                        if (dbSet.has(csvKey)) {
                            duplicateRows.push({
                                row: rowNumber,
                                reason:
                                    "Question already exists in database",
                            });
                            return;
                        }

                        validQuestions.push({
                            category: row.category,
                            subCategory: row.subCategory,
                            difficulty: row.difficulty,
                            question: row.question,
                            options,
                            correctAnswer: row.correctAnswer,
                        });
                    });

                    // Insert Valid Questions
                    if (validQuestions.length > 0) {
                        await Question.insertMany(validQuestions);
                    }

                    fs.unlinkSync(req.file.path);

                    return res.status(200).json({
                        success: true,
                        message: "CSV processed successfully",
                        summary: {
                            totalRows: rows.length,
                            inserted: validQuestions.length,
                            invalid: invalidRows.length,
                            duplicates: duplicateRows.length,
                        },
                        invalidRows,
                        duplicateRows,
                    });
                } catch (err) {
                    fs.unlinkSync(req.file.path);

                    return res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                }
            });
    } catch (err) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    upload,
    uploadFile,
};