import React, { useEffect, useState } from "react";

import courseService from "../services/courseService";
import lessonService from "../services/lessonService";

import { Link, useParams } from "react-router-dom";
import CourseDetailCard from "../components/CourseDetailCard";

import { ROUTE_PATH } from "../constants/routePath";

function CourseDetailPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  const [getAllCourses, setGetAllCourses] = useState([]);

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

    fetchAllCourses();
    fetchCourse();
    fetchLessons();
  }, [courseId]);

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
                      // onClick={() => handleViewLesson(lesson._id)}
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
      </div>

      {/* Các môn học khác */}
      <div className="w-1/4 pl-6">
        <h2 className="text-xl text-yellow-600 font-semibold mb-4">Các môn học khác</h2>
        <ul className="space-y-4  overflow-y-auto">
          {getAllCourses.filter((item) => item._id !== courseId).map((item) => (
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
                <Link to={`${ROUTE_PATH.STUDENT_COURSE_DETAIL.replace(":courseId", item._id)}`}>
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
