const Course = require("../models/Course");

const CourseController = {
    // Tạo khóa học
    createCourse: async (req, res) => {
        try {
            const userId = req.user.userId; // Lấy ID người dùng từ token
            const newCourse = new Course({
                ...req.body,
                instructor: userId, // Gán người tạo khóa học
            });
            await newCourse.save();
            res.status(201).json({ data: newCourse, message: "Khóa học đã được tạo thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo khóa học" });
        }
    },

    // Lấy toàn bộ khóa học
    getAllCourses: async (req, res) => {
        try {
            const courses = await Course.find();
            res.status(200).json({ success: true, data: courses });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Lấy khóa học theo người tạo
    getCoursesByInstructor: async (req, res) => {
        try {
            const instructorId = req.user.userId; // Lấy ID người dùng từ token
            const courses = await Course.find({ instructor: instructorId });
            res.status(200).json({data: courses, message: "Lấy khóa học theo giảng viên thành công" });
        } catch (error) {
            res.status(500).json({ message: error.message, message: "Lỗi khi lấy khóa học theo giảng viên" });
        }
    }

};

module.exports = CourseController;
