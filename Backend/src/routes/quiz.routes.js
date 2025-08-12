const express = require('express');
const router = express.Router();

const QuizController = require('../app/controllers/quizController');

const authenticateToken = require("../app/middlewares/authMiddleware");
const { authorize } = require("../app/middlewares/authorize");

router.get('/:courseId/quizzes', QuizController.getQuizzesByCourse);
router.post('/:courseId/quizzes', authenticateToken, authorize("lecturer"), QuizController.createQuiz);

module.exports = router;