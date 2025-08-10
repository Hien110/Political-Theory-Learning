import React, { useEffect, useState } from "react";

import courseService from "../services/courseService";
import CourseCard from "../components/CourseCard";

function HomePage() {
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
      <div className="bg-yellow-500 text-red-900 py-1 overflow-hidden whitespace-nowrap fixed top-20 w-full z-10">
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
            {course.map((course) => (
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
                Hàng trăm câu hỏi tự luận có đáp án chi tiết giúp củng cố kiến
                thức
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

        <section className="mb-16 bg-red-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-red-800">
            Nhận Xét Của Người Học
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Người dùng"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">Nguyễn Thị Hương</h4>
                  <p className="text-gray-600 text-sm">Sinh viên Đại học KHXH&NV</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Trang web giúp mình hệ thống kiến thức rõ ràng, dễ hiểu. Các
                câu hỏi ôn tập rất sát với chương trình học."
              </p>
              <div className="mt-3 text-yellow-500">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Người dùng"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">Trần Văn Minh</h4>
                  <p className="text-gray-600 text-sm">Cán bộ Đoàn</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Tôi thường xuyên sử dụng trang web để ôn tập và chuẩn bị cho
                các kỳ thi lý luận chính trị. Giao diện thân thiện, nội dung
                chất lượng."
              </p>
              <div className="mt-3 text-yellow-500">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
