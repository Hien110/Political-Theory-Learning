const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  content: { type: String }, // text content hoặc markdown
  videoUrl: { type: String },
  imageUrls: [{ type: String }],
  fileUrls: [{ type: String }],
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Lesson", lessonSchema);
