const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: false },
  title: { type: String, required: true },
  questions: [{
    questionBankRef: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionBank", required: true }
  }],
  timeLimit: { type: Number }, // số phút giới hạn thời gian
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);
