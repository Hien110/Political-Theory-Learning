const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  score: { type: Number },
  correctAnswers: { type: Number },
  totalQuestions: { type: Number },
  answers: [{
    questionBankRef: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionBank" },
    selectedOptionIndex: { type: Number }
  }]
}, { timestamps: true });

module.exports = mongoose.model("QuizResult", quizResultSchema);
