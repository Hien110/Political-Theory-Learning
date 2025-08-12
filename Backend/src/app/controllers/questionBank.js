const QuestionBank = require('../models/QuestionBank');

const QuestionBankController = {

    // lấy tất cả câu hỏi
    getAllQuestions: async (req, res) => {
        try {
            const questions = await QuestionBank.find({ deleted: false });
            res.json({data: questions, message: "Lấy tất cả câu hỏi thành công"});
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy tất cả câu hỏi' });
        }
    },

    // tạo câu hỏi mới
    createQuestion: async (req, res) => {
        try {
            const newQuestion = new QuestionBank(req.body);
            await newQuestion.save();
            res.status(201).json({data: newQuestion, message: "Tạo câu hỏi thành công"});
        } catch (error) {
            res.status(500).json({ message: 'Error creating question' });
        }
    },

    // Cập nhập câu hỏi 
    updateQuestion: async (req, res) => {
        try {
            const questionId = req.params.questionId;
            const updatedData = req.body;
            const updatedQuestion = await QuestionBank.findByIdAndUpdate(questionId, updatedData, { new: true });
            if (!updatedQuestion) {
                return res.status(404).json({ message: 'Không tìm thấy câu hỏi' });
            }
            res.json({ data: updatedQuestion, message: "Cập nhật câu hỏi thành công" });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật câu hỏi' });
        }
    },

    // Xóa câu hỏi
    deleteQuestion: async (req, res) => {
        try {
            const questionId = req.params.questionId;
            const deletedQuestion = await QuestionBank.findByIdAndUpdate(questionId, { deleted: true }, { new: true });
            if (!deletedQuestion) {
                return res.status(404).json({ message: 'Không tìm thấy câu hỏi' });
            }
            res.json({ message: "Xóa câu hỏi thành công" });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa câu hỏi' });
        }
    },

    // Lấy câu hỏi theo ID
    getQuestionById: async (req, res) => {
        try {
            const questionId = req.params.questionId;
            const question = await QuestionBank.findById(questionId);
            if (!question) {
                return res.status(404).json({ message: 'Không tìm thấy câu hỏi' });
            }
            res.json({ data: question, message: "Lấy câu hỏi thành công" });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy câu hỏi' });
        }
    },

    // lấy câu hỏi theo course
    getQuestionByCourse: async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const questions = await QuestionBank.find({ course: courseId, deleted: false });
            res.json({ data: questions, message: "Lấy câu hỏi theo khóa học thành công" });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy câu hỏi theo khóa học' });
        }
    }

}

module.exports = QuestionBankController;
