const { create } = require("../models/QuestionBank");
const Quiz = require("../models/Quiz");

const QuizController = {
    // Lấy danh sách quiz theo khóa học
    getQuizzesByCourse: async (req, res) => {
        try {
            const { courseId } = req.params;
            const quizzes = await Quiz.find({ course: courseId, deleted: false }).populate("questions.questionBankRef");
            res.status(200).json({ data: quizzes, message: "Lấy danh sách quiz thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lấy danh sách quiz thất bại" });
        }
    },

    // Tạo quizz
    createQuiz: async (req, res) => {
        try {
            const newQuiz = req.body;
            const courseId = req.params.courseId;
            const quiz = new Quiz({
                ...newQuiz,
                course: courseId,
                createdBy: req.user.userId, // Assuming you have user info in req.user
            });

            console.log(quiz, "quiz");
            console.log(newQuiz, "newQuiz");
            console.log(courseId, "courseId");

            await quiz.save();
            res.status(201).json({ message: "Tạo quiz thành công", data: quiz });
        } catch (error) {
            res.status(500).json({ message: "Tạo quiz thất bại" });
        }
    }
};

module.exports = QuizController;
