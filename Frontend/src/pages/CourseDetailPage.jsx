import React, { useEffect, useState } from "react";

import courseService from "../services/courseService";
import lessonService from "../services/lessonService";
import QuizService from "../services/quizService";
import quizResultService from "../services/quizResultService";

import { Link, useParams, useNavigate } from "react-router-dom";
import CourseDetailCard from "../components/CourseDetailCard";

import { ROUTE_PATH } from "../constants/routePath";
import userService from "../services/userService";
import { toast } from "sonner";

function CourseDetailPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const [getAllCourses, setGetAllCourses] = useState([]);

  const user = userService.getCurrentUser();

  const navigate = useNavigate();
  useEffect(() => {
    // Load course chi tiết
    const fetchCourse = async () => {
      const res = await courseService.getCourseById(courseId);
      if (res.success) {
        setCourse(res.data);
      }
    };

    const fetchLessons = async () => {
      const res = await lessonService.getLessonsByCourse(courseId);
      if (res.success) setLessons(res.data);
    };

    const fetchAllCourses = async () => {
      const res = await courseService.getAllCourses();
      if (res.success) setGetAllCourses(res.data);
    };

    const fetchQuizzes = async () => {
      const res = await QuizService.getQuizzesByCourse(courseId);
      if (res.success) setQuizzes(res.data);
    };

    fetchAllCourses();
    fetchCourse();
    fetchLessons();
    fetchQuizzes();
  }, [courseId]);

  const handleViewLesson = (lessonId) => {
    // Navigate to the lesson detail page
    window.location.href = ROUTE_PATH.STUDENT_LESSON_DETAIL.replace(
      ":courseId",
      courseId
    ).replace(":lessonId", lessonId);
  };

  //xử lí vào làm bài
  const handleQuizTest = async (quizId) => {
    if (!user?._id) {
      toast.error("Không tìm thấy thông tin người dùng");
      navigate(ROUTE_PATH.LOGIN);
      return;
    }

    try {
      const [existingQuizResult, quizTest] = await Promise.all([
        quizResultService.getQuizResultsByUserIdAndQuizId(user._id, quizId),
        QuizService.getQuizById(quizId),
      ]);

      if (!existingQuizResult?.success || !quizTest?.success) {
        toast.error("Không thể tải dữ liệu bài quiz");
        return;
      }
      
      if (existingQuizResult.data?.length >= quizTest.data?.attempts) {
        toast.error("Bạn đã hết số lượt kiểm tra bài này.");
        return;
      }

      window.location.href = ROUTE_PATH.STUDENT_QUIZ_TEST.replace(
        ":quizId",
        quizId
      );
    } catch (error) {
      toast.error("Lỗi khi kiểm tra bài quiz");
      console.error(error);
    }
  };

  if (!course) {
    return <div>Đang tải khóa học...</div>;
  }

  return (
    <div className="min-h-screen pt-6 flex p-10">
      <div className="container mx-auto px-4 w-3/4 border-r border-gray-300">
        <div className=" bg-white ">
          {/* Thông tin khóa học */}
          <div className="pb-6 mb-10 border-b border-gray-300 ">
            <CourseDetailCard course={course} />
          </div>
        </div>

        {/* Danh sách bài học */}
        <section className="mb-12 border-b border-gray-300 pb-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-6 border-b border-gray-300 pb-2">
            Danh sách bài học
          </h2>

          {lessons.length === 0 ? (
            <p className="text-gray-500 italic">Chưa có bài học nào</p>
          ) : (
            <ul className="space-y-6">
              {lessons.map((lesson, index) => (
                <li
                  key={index}
                  className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-center bg-white hover:bg-gray-50"
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-yellow-600">
                      {lesson.title}
                    </h3>
                    <div className="text-gray-600 line-clamp-1">
                      <div
                        dangerouslySetInnerHTML={{ __html: lesson.content }}
                      />
                    </div>
                  </div>
                  <div className="">
                    <button
                      onClick={() => handleViewLesson(lesson._id)}
                      className="cursor-pointer text-yellow-600 border border-yellow-600 px-3 py-1 text-sm rounded-lg hover:bg-yellow-600 hover:text-white font-medium transition duration-300"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Danh sách quiz */}
        <section className="mb-12 border-b border-gray-300 pb-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-6 border-b border-gray-300 pb-2">
            Danh sách quiz
          </h2>

          {quizzes.length === 0 ? (
            <p className="text-gray-500 italic">Chưa có quiz nào</p>
          ) : (
            <ul className="space-y-6">
              {quizzes.map((quiz, index) => (
                <li
                  key={index}
                  className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-center bg-white hover:bg-gray-50"
                >
                  <div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-yellow-600 max-w-md">
                        {quiz.title}
                      </h3>
                      <p className="text-gray-600">
                        <span className="font-medium">Số câu hỏi:</span>{" "}
                        {quiz.totalQuestions}
                      </p>
                    </div>
                  </div>
                  {/* Thời gian làm bài */}
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">Thời gian làm bài:</span>{" "}
                      {quiz.timeLimit} phút
                    </p>

                    {/* số lần làm bài */}
                    <p className="text-gray-600">
                      <span className="font-medium">Số lần làm bài:</span>{" "}
                      {quiz.attempts}
                    </p>
                  </div>
                  <div className="">
                    <button
                      onClick={() => handleQuizTest(quiz._id)}
                      className="cursor-pointer text-yellow-600 border border-yellow-600 px-3 py-1 text-sm rounded-lg hover:bg-yellow-600 hover:text-white font-medium transition duration-300"
                    >
                      Làm bài ngay
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Các môn học khác */}
      <div className="w-1/4 pl-6">
        <h2 className="text-xl text-yellow-600 font-semibold mb-4">
          Các môn học khác
        </h2>
        <ul className="space-y-4  overflow-y-auto">
          {getAllCourses
            .filter((item) => item._id !== courseId)
            .map((item) => (
              <li
                key={item._id}
                className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
              >
                <img
                  src={item.thumbnail || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold text-yellow-600 mb-1 hover:underline cursor-pointer">
                  <Link
                    to={`${ROUTE_PATH.STUDENT_COURSE_DETAIL.replace(
                      ":courseId",
                      item._id
                    )}`}
                  >
                    {item.title}
                  </Link>
                </h3>
                <div
                  className="text-gray-600 line-clamp-1"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseDetailPage;
