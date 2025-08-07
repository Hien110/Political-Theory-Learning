const mongoose = require("mongoose");

const questionBankSchema = new mongoose.Schema({
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: false }, 
  question: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true }
    }
  ],
  tags: [String], // ví dụ: ["OOP", "NodeJS", "React"]
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // giảng viên tạo
}, { timestamps: true });

module.exports = mongoose.model("QuestionBank", questionBankSchema);
