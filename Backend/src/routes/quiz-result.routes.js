const express = require('express');
const quizResultController = require('../app/controllers/quizResultController');
const router = express.Router();

const authenticateToken = require("../app/middlewares/authMiddleware");
const { authorize } = require("../app/middlewares/authorize");

// Tạo kết quả quiz
router.post('/', authenticateToken, authorize('student'), quizResultController.create);

// Lấy kết quả quizResult theo Id
router.get('/quizReult/:quizResultId', authenticateToken, quizResultController.getQuizResultById);

// Lấy kết quả quizResult theo khóa học
router.get('/course/:courseId', authenticateToken, authorize('student'), quizResultController.getQuizResultsByCourse);

// Lấy kết quả theo userId
router.get('/user/getAllResult', authenticateToken, authorize('student'), quizResultController.getQuizResultsByUserId);

// Lấy nhiều quizResult theo userId và quizId
router.get('/:userId/:quizId', authenticateToken, authorize('student'), quizResultController.getByUserIdAndQuizId);


module.exports = router;