import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizService from "../services/quizService";

function TestQuizPage() {
  const { quizId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [quiz, setQuiz] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [endTime, setEndTime] = useState(null);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Lấy dữ liệu quiz và endTime từ localStorage
  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await QuizService.getQuizById(quizId);
      if (res.success) {
        setQuiz(res.data);

        // Kiểm tra endTime trong localStorage
        let savedEndTime = localStorage.getItem(`quiz-${quizId}-endTime`);
        if (!savedEndTime) {
          // Lần đầu làm bài → tính endTime mới
          savedEndTime = Date.now() + (res.data.timeLimit || 0) * 60 * 1000;
          localStorage.setItem(`quiz-${quizId}-endTime`, savedEndTime);
        }
        setEndTime(Number(savedEndTime));
      }
    };
    fetchQuiz();
  }, [quizId]);

  // Đếm ngược thời gian
  useEffect(() => {
    if (!endTime) return;

    const timer = setInterval(() => {
      const diff = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(diff);
      if (diff <= 0) {
        clearInterval(timer);
        // Khi hết giờ có thể auto submit
        console.log("Hết giờ, nộp bài tự động:", answers);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [endTime, answers]);

  // Chọn đáp án
  const handleSelectOption = (questionId, optionIndex, isMultiple) => {
    setAnswers((prev) => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];
        return currentAnswers.includes(optionIndex)
          ? {
              ...prev,
              [questionId]: currentAnswers.filter((i) => i !== optionIndex),
            }
          : { ...prev, [questionId]: [...currentAnswers, optionIndex] };
      } else {
        return { ...prev, [questionId]: [optionIndex] };
      }
    });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (!quiz)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/5 border-r bg-white shadow-sm">
        <div className="fixed p-4 border border-gray-100 shadow-md rounded-lg w-[calc(20%-2px)] bg-white">
          {/* Thông tin người làm */}
          <p className="mb-3 text-gray-700">
            Người làm:{" "}
            <span className="font-semibold text-red-600">
              {user?.name || "Ẩn danh"}
            </span>
          </p>
          <div className="text-md font-semibold text-red-500 mb-3">
            Thời gian làm bài: {formatTime(timeLeft)}
          </div>
          {/* Danh sách câu hỏi */}
          <h2 className="font-bold text-lg mb-4 text-gray-500">
            Danh sách câu hỏi
          </h2>
          <div className="grid grid-cols-5 gap-2">
            {quiz.questions.map((q, idx) => {
              const answered = answers[q._id]?.length > 0;
              return (
                <div
                  key={q._id}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer font-semibold transition-all duration-200
                ${
                  answered
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
                  onClick={() => {
                    const element = document.getElementById(`question-${idx}`);
                    if (element) {
                      const top =
                        element.getBoundingClientRect().top +
                        window.scrollY -
                        90;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                >
                  {idx + 1}
                </div>
              );
            })}
          </div>

          {/* Thống kê */}
          <div className="mt-4 text-sm text-gray-600">
            Đã trả lời:{" "}
            <span className="font-medium text-blue-600">
              {Object.keys(answers).length}
            </span>
            /{quiz.questions.length}
          </div>

          {/* Nút nộp bài */}
          <div className="mt-6">
            <button
              onClick={() => {
                console.log("Submit:", answers);
                localStorage.removeItem(`quiz-${quizId}-endTime`);
              }}
              className="cursor-pointer py-3 px-4 w-full rounded-xl text-white font-semibold bg-red-500 hover:bg-red-600 shadow-md transition-all duration-300"
            >
              Nộp bài
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h1 className="text-2xl font-bold text-yellow-600 max-w-2xl">
            {quiz.title}
          </h1>

        </div>

        {/* Danh sách câu hỏi */}
        <div className="space-y-6">
          {quiz.questions.map((q, idx) => {
            const opts = q.questionBankRef?.options || [];
            const correctCount = opts.filter((o) => o.isCorrect).length;
            const isMultiple = correctCount > 1;

            return (
              <div
                key={q._id}
                id={`question-${idx}`}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow hover:shadow-md transition-all duration-200"
              >
                <p className="font-semibold text-lg text-gray-800 mb-4">
                  Câu {idx + 1}: {q.questionBankRef?.question}
                </p>

                <ul className="space-y-3">
                  {opts.map((opt, i) => (
                    <li
                      key={i}
                      className="p-2 rounded hover:bg-gray-50 transition-all duration-150"
                    >
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        {isMultiple ? (
                          <input
                            type="checkbox"
                            checked={answers[q._id]?.includes(i) || false}
                            onChange={() => handleSelectOption(q._id, i, true)}
                            className="w-4 h-4 accent-blue-600 cursor-pointer"
                          />
                        ) : (
                          <input
                            type="radio"
                            name={`question-${q._id}`}
                            checked={answers[q._id]?.includes(i) || false}
                            onChange={() => handleSelectOption(q._id, i, false)}
                            className="w-4 h-4 accent-blue-600 cursor-pointer"
                          />
                        )}
                        <span className="text-gray-700">
                          <span className="font-medium">{alphabet[i]}.</span>{" "}
                          {opt.text}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TestQuizPage;
