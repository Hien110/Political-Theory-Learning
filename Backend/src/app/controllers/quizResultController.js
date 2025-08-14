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
      const quizResults = await QuizResult.find({ student: userId, quiz: quizId });
      
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
      res
        .status(200)
        .json({
          data: quizResults,
          message: "Lấy kết quả quiz theo khóa học thành công",
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy kết quả quiz theo khóa học", error });
    }
  },
};

module.exports = QuizResultController;
