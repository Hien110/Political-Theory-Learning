const express = require("express");
const router = express.Router();
const CourseController = require("../app/controllers/courseController");

const authenticateToken = require("../app/middlewares/authMiddleware");
const { authorize } = require("../app/middlewares/authorize");

// Tạo môn học
router.post("/create", authenticateToken, authorize("lecturer"), CourseController.createCourse);

// Lấy khóa học theo người tạo
router.get("/instructor", authenticateToken, CourseController.getCoursesByInstructor);

module.exports = router;