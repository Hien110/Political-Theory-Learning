const express = require('express');
const router = express.Router();

const LessonController = require('../app/controllers/lessonController');

// Tạo bài học
router.post('/:courseId/lessons', LessonController.createLesson);

// Lấy toàn bộ bài học theo khóa học
router.get('/:courseId/lessons', LessonController.getLessonsByCourse);

// Lấy bài học theo ID
router.get('/lessons/:lessonId', LessonController.getLessonById);

module.exports = router;