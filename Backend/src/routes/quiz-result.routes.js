const express = require('express');
const quizResultController = require('../app/controllers/quizResultController');
const router = express.Router();

const authenticateToken = require("../app/middlewares/authMiddleware");
const { authorize } = require("../app/middlewares/authorize");

// Tạo kết quả quiz
router.post('/', authenticateToken, authorize('student'), quizResultController.create);

// Lấy nhiều quiz theo userId và quizId
router.get('/:userId/:quizId', authenticateToken, authorize('student'), quizResultController.getByUserIdAndQuizId);

// Lấy kết quả quiz theo khóa học
router.get('/course/:courseId', authenticateToken, authorize('student'), quizResultController.getQuizResultsByCourse);

module.exports = router;