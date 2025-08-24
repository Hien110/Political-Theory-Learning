import React, { useEffect, useState } from "react";

import courseService from "../services/courseService";
import CourseCard from "../components/CourseCard";

import { motion } from "framer-motion";
function HomePage() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await courseService.getAllCourses();
      setCourse(response.data);
    };

    fetchCourse();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Banner hình ảnh */}
      <div className="p-4 px-10 mt-10">
        <motion.img
          src="https://inoxnamcuong.vn/wp-content/uploads/2022/08/146_chao_mung_75_nam_quoc_khanh_2_9_greenair_viet_nam-1.jpg"
          alt="Banner"
          className="w-full h-90 rounded-lg shadow-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Marquee Section */}
      <div className="bg-yellow-500 text-red-900 py-1 overflow-hidden whitespace-nowrap fixed top-15 w-full z-10">
        <div className="animate-marquee font-medium flex space-x-12 px-4">
          <span>
            Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh
          </span>
          <span>Nâng cao nhận thức lý luận chính trị</span>
          <span>Rèn luyện bản lĩnh chính trị vững vàng</span>
        </div>
      </div>
      <main className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-red-800">
            Các Môn Học Lý Luận Chính Trị
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {course?.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-red-800">
            Tính Năng Nổi Bật
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-blue-800 p-4 rounded-full inline-block mb-4">
                <i className="fas fa-book-open text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Tài liệu học tập</h3>
              <p className="text-gray-700">
                Hệ thống tài liệu đầy đủ, chính xác, được biên soạn bởi các
                chuyên gia
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 text-green-800 p-4 rounded-full inline-block mb-4">
                <i className="fas fa-question-circle text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Câu hỏi ôn tập</h3>
              <p className="text-gray-700">
                Hàng trăm câu hỏi trắc có đáp án chi tiết giúp củng cố kiến thức
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-red-100 text-red-800 p-4 rounded-full inline-block mb-4">
                <i className="fas fa-tasks text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Bài kiểm tra</h3>
              <p className="text-gray-700">
                Hệ thống bài kiểm tra trắc nghiệm đa dạng với chấm điểm tự động
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
