const QuizResult = require("../models/quizResult");

const QuizResultController = {
  // Tạo kết quả quiz
  create: async (req, res) => {
    try {
      const quizResult = new QuizResult(req.body);
      await quizResult.save();
      res
        .status(201)
        .json({ data: quizResult, message: "Đã nộp bài thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi nộp bài", error });
    }
  },

  // Lấy nhiều quiz theo userId và quizId
  getByUserIdAndQuizId: async (req, res) => {
    try {
      const { userId, quizId } = req.params;
      const quizResults = await QuizResult.find({
        student: userId,
        quiz: quizId,
      });

      if (!quizResults || quizResults.length === 0) {
        return res
          .status(200)
          .json({ data: [], message: "Chưa có kết quả quiz" });
      }
      res
        .status(200)
        .json({ data: quizResults, message: "Lấy kết quả quiz thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy kết quả quiz", error });
    }
  },

  // Lấy quiz result theo Id
  getQuizResultById: async (req, res) => {
    try {
      const { quizResultId } = req.params;
      const quizResult = await QuizResult.findById(quizResultId).populate(
        "student quiz course answers.questionBankRef"
      );
      if (!quizResult) {
        return res.status(404).json({ message: "Không tìm thấy bài kiểm tra" });
      }

      res.status(200).json({
        data: quizResult,
        message: "Lấy kết quả bài kiểm tra thành công",
      });
    } catch (error) {
      res.status(500).json({ message: "Lấy kết quả bài kiểm tra thất bại" });
    }
  },

  //Lấy quiz theo course
  getQuizResultsByCourse: async (req, res) => {
    try {
      const { courseId } = req.params;
      const quizResults = await QuizResult.find({ course: courseId });
      if (!quizResults || quizResults.length === 0) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy kết quả quiz cho khóa học này" });
      }
      res.status(200).json({
        data: quizResults,
        message: "Lấy kết quả quiz theo khóa học thành công",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy kết quả quiz theo khóa học", error });
    }
  },

  // Lấy quiz theo userId
  getQuizResultsByUserId: async (req, res) => {
    try {
      const userId = req.user.userId; // Lấy userId từ token
      console.log(userId);

      const quizResults = await QuizResult.find({ student: userId }).populate("course quiz");
      if (!quizResults || quizResults.length === 0) {
        return res
          .status(200)
          .json({data: [], message: "Không tìm thấy kết quả quiz cho người dùng này" });
      }
      res.status(200).json({
        data: quizResults,
        message: "Lấy kết quả quiz theo người dùng thành công",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy kết quả quiz theo người dùng", error });
    }
  },
};

module.exports = QuizResultController;
