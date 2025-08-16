import React, { useEffect, useState } from "react";

import courseService from "../services/courseService";
import CourseCard from "../components/CourseCard";

function CoursePage() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await courseService.getAllCourses();
      setCourse(response.data);
    };

    fetchCourse();
  }, []);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Marquee Section */}
      <main className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-red-800">
            Các Môn Học Lý Luận Chính Trị
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {course.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default CoursePage;
