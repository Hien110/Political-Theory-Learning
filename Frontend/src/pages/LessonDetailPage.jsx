import React, { useEffect, useState } from "react";

import LessonDetailCard from "../components/LessonDetailCard";

import { Link, useParams } from "react-router-dom";

import { ROUTE_PATH } from "../constants/routePath";

import lessonService from "../services/lessonService";

function LessonDetailPage() {
  const { lessonId } = useParams();
  const { courseId } = useParams();

  const [lesson, setLesson] = useState(null);

  const [getAllLessons, setGetAllLessons] = useState([]);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLesson(null); // reset trước khi load mới
        const response = await lessonService.getLessonById(lessonId);
        setLesson(response.data);
      } catch (error) {
        console.error("Error fetching lesson:", error);
      }
    };

    const fetchAllLessons = async () => {
      try {
        const response = await lessonService.getAllLessons();
        setGetAllLessons(response.data.filter((item) => item._id !== lessonId));
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLesson();
    fetchAllLessons();
  }, [lessonId, courseId]);

  if (!lesson) {
    return <div className="min-h-screen">Loading...</div>;
  }

  return (
    <div className="w-full flex pl-10 pr-10">
      <LessonDetailCard className="w-3/4" lesson={lesson} />
      <div className="pl-10 w-1/4 border-l container border-gray-300 mt-10">
        <h2 className="text-xl text-yellow-600 font-semibold mb-4 text-center border-b border-gray-300 pb-2">
          Các bài học khác
        </h2>
        <ul>
          {getAllLessons.map((item) => (
            <li
              key={item._id}
              className="px-4 py-2 border border-yellow-500 rounded-lg mb-2"
            >
              <Link
                to={ROUTE_PATH.STUDENT_LESSON_DETAIL.replace(
                  ":courseId",
                  courseId
                ).replace(":lessonId", item._id)}
                className="text-yellow-500 hover:underline line-clamp-2"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LessonDetailPage;
