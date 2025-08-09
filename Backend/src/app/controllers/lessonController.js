const Lesson = require('../models/Lesson');

class LessonController {
    // Tạo bài học
    static async createLesson(req, res) {
        try {
            const courseId = req.params.courseId;
            const newLesson = new Lesson({
                ...req.body,
                course: courseId, // Gán khóa học cho bài học
            });

            await newLesson.save();
            res.status(201).json({ data: newLesson, message: "Bài học đã được tạo thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo bài học" });
        }
    }

    // Lấy toàn bộ bài học theo khóa học
    static async getLessonsByCourse(req, res) {
        try {
            const courseId = req.params.courseId;
            const lessons = await Lesson.find({ course: courseId });
            res.status(200).json({ data: lessons, message: "Lấy danh sách bài học thành công" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Lấy bài học theo ID
    static async getLessonById(req, res) {
        try {
            const lessonId = req.params.lessonId;
            const lesson = await Lesson.findById(lessonId).populate("course", "title"); // Lấy thông tin khóa học
            if (!lesson) {
                return res.status(404).json({ message: "Bài học không tồn tại" });
            }
            res.status(200).json({ data: lesson, message: "Lấy bài học thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy bài học theo ID" });
        }
    }
}

module.exports = LessonController;