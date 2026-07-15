

const User = require("../../../models/User");
const QuizAttempt = require('../../../models/QuestionAttempt');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /admin/users/:id

 const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const attempts = await QuizAttempt.find({ userId: id });

    const totalAttempts = attempts.length;

    const highestScore =
      attempts.length > 0
        ? Math.max(...attempts.map((a) => a.score))
        : 0;

    const averageScore =
      attempts.length > 0
        ? (
            attempts.reduce((sum, a) => sum + a.percentage, 0) /
            attempts.length
          ).toFixed(2)
        : 0;

    res.json({
      user,
      stats: {
        totalAttempts,
        highestScore,
        averageScore,
      },
      attempts,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// PUT /admin/users/:id

const updateUser = async (req, res) => {
  try {

    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// DELETE /admin/users/:id

const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};