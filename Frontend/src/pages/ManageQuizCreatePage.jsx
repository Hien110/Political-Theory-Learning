import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

import questionBankService from "../services/questionBankService";
import QuizService from "../services/quizService";

import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ManageQuizCreatePage() {
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [timeLimit, setTimeLimit] = useState(1);
  const [attempts, setAttempts] = useState(1);

  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [questionBank, setQuestionBank] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Chế độ chọn câu hỏi: manual | excel | random
  const [questionSource, setQuestionSource] = useState("manual");
  const [randomCount, setRandomCount] = useState(0);

  // Lấy danh sách course
  useEffect(() => {
    axios.get("/api/courses").then((res) => {
      setCourses(res.data);
    });
  }, []);

  // Lấy danh sách lessons & question bank khi chọn course
  useEffect(() => {
    if (courseId) {
      axios.get(`/api/lessons?courseId=${courseId}`).then((res) => {
        setLessons(res.data);
      });
      questionBankService.getQuestionByCourse(courseId).then((res) => {
        setQuestionBank(res.data);
      });
    }
  }, [courseId]);

  // Chọn câu hỏi thủ công
  const handleQuestionSelect = (questionId) => {
    setSelectedQuestions((prev) => {
      if (prev.includes(questionId)) {
        return prev.filter((id) => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  // Upload từ file Excel
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // jsonData sẽ là mảng object, bạn cần map sang format backend
      // Ở đây giả định file excel có cột "questionBankRef" là ID
      const ids = jsonData.map((row) => row.questionBankRef).filter(Boolean);
      setSelectedQuestions(ids);
    };
    reader.readAsArrayBuffer(file);
  };

  // Random từ QuestionBank
  const handleRandomSelect = () => {
    if (randomCount > 0 && questionBank.length > 0) {
      const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, randomCount).map((q) => q._id);
      setSelectedQuestions(selected);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuiz = {
      course: courseId,
      title,
      questions: selectedQuestions.map((qId) => ({ questionBankRef: qId })),
      timeLimit,
      totalQuestions: selectedQuestions.length,
      attempts,
    };

    
    try {
      const response = await QuizService.createQuiz(courseId, newQuiz);
      if (response.success) {
        toast.success("Tạo quiz thành công!");
        // Reset form
        setTitle("");
        setLessonId("");
        setTimeLimit(1);
        setAttempts(1);
        setSelectedQuestions([]);
      } else {
        toast.error(response.message || "Lỗi khi tạo quiz");
      }
    } catch (error) {
      toast.error("Lỗi khi tạo quiz", error);
    }
  };

  return (
    <div className="mx-auto bg-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-3">
        Tạo bài kiểm tra
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tiêu đề */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Tiêu đề
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            placeholder="Nhập tiêu đề bài kiểm tra..."
            required
          />
        </div>

        {/* Giới hạn thời gian */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Giới hạn thời gian (phút)
          </label>
          <input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            min={1}
          />
        </div>

        {/* Số lần làm */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Số lần làm
          </label>
          <input
            type="number"
            value={attempts}
            onChange={(e) => setAttempts(Number(e.target.value))}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            min={1}
          />
        </div>

        {/* Chọn nguồn câu hỏi */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Nguồn câu hỏi
          </label>
          <select
            value={questionSource}
            onChange={(e) => setQuestionSource(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          >
            <option value="manual">Chọn thủ công từ QuestionBank</option>
            <option value="excel">Tải từ file Excel</option>
            <option value="random">Chọn ngẫu nhiên từ QuestionBank</option>
          </select>
        </div>

        {/* Chọn câu hỏi thủ công */}
        {questionSource === "manual" && questionBank.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-3">
              <label className="font-semibold">Chọn câu hỏi</label>
              <span className="text-sm text-gray-600">
                Đã chọn: {selectedQuestions.length}/{questionBank.length}
              </span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {questionBank.map((q) => (
                <label
                  key={q._id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(q._id)}
                    onChange={() => handleQuestionSelect(q._id)}
                    className="w-4 h-4"
                  />
                  <span>{q.question}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Upload từ file Excel */}
        {questionSource === "excel" && (
          <div>
            <div>
              <input
                type="file"
                accept=".xlsx, .xls"
                className="border border-gray-300 p-2 rounded-lg file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-red-50 file:text-red-700
                     hover:file:bg-red-100"
                onChange={handleExcelUpload}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Chọn file Excel chứa câu hỏi để tải lên
            </p>

            {/* File mẫu */}
            <a
              href={`${import.meta.env.BASE_URL}TaoCauHoiMau.xlsx`}
              download
              className="text-sm text-blue-600 hover:underline mt-2 block"
            >
              Tải về file mẫu
            </a>
          </div>
        )}

        {/* Random câu hỏi */}
        {questionSource === "random" && (
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Số câu hỏi muốn random
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={randomCount}
                onChange={(e) => setRandomCount(Number(e.target.value))}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                min={1}
                max={questionBank.length}
              />
              <button
                type="button"
                onClick={handleRandomSelect}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Chọn ngẫu nhiên
              </button>
            </div>
          </div>
        )}

        {/* Nút submit */}
        <button
          type="submit"
          className="cursor-pointer py-3 px-4 w-full rounded-xl text-white font-semibold bg-red-500 hover:bg-red-600 shadow-md transition-all duration-300"
        >
          Tạo quiz
        </button>
      </form>
    </div>
  );
}

export default ManageQuizCreatePage;
