import React, { useEffect, useState } from "react";

import { ROUTE_PATH } from "../constants/routePath";

import { useParams } from "react-router-dom";

import QuizService from "../services/quizService";

function ManageQuizListPage() {
  const { courseId } = useParams();

  const [quizzes, setQuizzes] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const result = await QuizService.getQuizzesByCourse(courseId);
        if (result.success) {
          setQuizzes(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [courseId]);

  if (Loading) {
    return <div className="min-h-screen">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b border-gray-200 pb-2">
        Danh sách bài kiểm tra
      </h1>
      {quizzes.length === 0 ? (
        <p className="text-gray-500 italic">Khóa học này chưa có bài kiểm tra nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
              <p className="text-gray-600">{quiz.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-4 right-4 max-w-[250px] px-4 py-1 ">
        <button
          className="w-full py-3 px-4 rounded-xl text-white font-semibold bg-gradient-to-r from-red-500 to-red-400 transition-colors duration-500 ease-in-out hover:from-red-600 hover:to-red-500 cursor-pointer shadow-md"
          onClick={() =>
            (window.location.href = ROUTE_PATH.LECTURER_QUIZ_CREATE.replace(":courseId", courseId))
          }
        >
          <span className="text-lg mr-2">+</span>
          Tạo bài kiểm tra
        </button>
      </div>
    </div>
  );
}

export default ManageQuizListPage;
