import React, { useEffect, useRef, useState } from "react";

import courseService from "../services/courseService";
import lessonService from "../services/lessonService"; // giả sử bạn có service này
import {
  uploadMultipleFilesToCloudinary,
  uploadMultipleImagesToCloudinary,
} from "../services/uploadCloudinary";

import MyEditor from "../components/MyEditor";

import { Link, useParams } from "react-router-dom";

import { toast } from "sonner";

function ManageCourseDetailPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  // State tạo bài học mới
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonVideoUrl, setLessonVideoUrl] = useState("");
  const [loadingLesson, setLoadingLesson] = useState(false);
  const [lessonImages, setLessonImages] = useState([]); // nhiều ảnh
  const [lessonFiles, setLessonFiles] = useState([]); // nhiều file PDF/Word

  const lessonImagesRef = useRef(null);
  const lessonFilesRef = useRef(null);
  // Load danh sách bài học theo courseId
  const fetchLessons = async () => {
    const res = await lessonService.getLessonsByCourse(courseId);
    if (res.success) setLessons(res.data);
  };

  useEffect(() => {
    // Load course chi tiết
    const fetchCourse = async () => {
      const res = await courseService.getCourseById(courseId);
      if (res.success) setCourse(res.data);
    };

    fetchCourse();
    fetchLessons();
  }, [courseId]);

  // Xử lý tạo bài học mới
  const handleCreateLesson = async (e) => {
    e.preventDefault();
    if (!lessonTitle.trim()) {
      alert("Vui lòng nhập tiêu đề bài học");
      return;
    }

    if (!lessonContent.trim()) {
      alert("Vui lòng nhập nội dung bài học");
      return;
    }

    setLoadingLesson(true);

    try {
      // Upload ảnh nội dung
      const imageUrls = await uploadMultipleImagesToCloudinary(lessonImages);

      // Upload file PDF/Word
      const fileUrls = await uploadMultipleFilesToCloudinary(lessonFiles);

      const newLesson = {
        course: courseId,
        title: lessonTitle,
        content: lessonContent,
        videoUrl: lessonVideoUrl,
        imageUrls, // mảng URL ảnh
        fileUrls, // mảng URL file
      };

      const res = await lessonService.createLesson(newLesson);

      if (res.success) {
        toast.success("Tạo bài học thành công");
        setLessons((prev) => [...prev, res.data]);
        setLessonTitle("");
        setLessonContent("");
        setLessonVideoUrl("");
        setLessonImages([]);
        setLessonFiles([]);

        if (lessonImagesRef.current) lessonImagesRef.current.value = "";
        if (lessonFilesRef.current) lessonFilesRef.current.value = "";
        // reset input file nếu muốn: tham khảo thêm bên dưới
        fetchLessons(); // cập nhật lại danh sách bài học
      } else {
        toast.error("Tạo bài học thất bại");
      }
    } catch (error) {
      toast.error("Lỗi khi tải file lên Cloudinary hoặc tạo bài học");
      console.error(error);
    } finally {
      setLoadingLesson(false);
    }
  };

  const handleEditorChange = (value) => {
    setLessonContent(value);
  };

  const handleViewLesson = (lessonId) => {
    // Navigate to the lesson detail page
    window.location.href = `lecturer/courses/${courseId}/lessons/${lessonId}`;
  };

  if (!course) {
    return <div>Đang tải khóa học...</div>;
  }

  return (
    <div className=" bg-white ">
      {/* Thông tin khóa học */}
       <div className="border-b border-gray-300 pb-6 mb-10">
      {course.thumbnail ? (
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-72 object-cover rounded-xl mb-8 shadow-md"
        />
      ) : (
        <div className="w-full h-72 bg-gray-100 flex items-center justify-center rounded-xl mb-8 text-gray-400 text-lg font-semibold">
          Không có ảnh đại diện
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-red-700">{course.title}</h1>

      <div
        className="prose prose-red max-w-full mb-12 text-gray-700 "
        dangerouslySetInnerHTML={{
          __html: course.description || "<p>Không có mô tả</p>",
        }}
      />

      {/* Chỉnh sửa hoặc xóa môn học */}
      <div className="flex space-x-4 justify-start">
        <button className="text-yellow-600 border border-yellow-600 px-4 py-2 rounded-lg text-sm transition duration-300 hover:bg-yellow-600 hover:text-white font-medium">
          Chỉnh sửa
        </button>
        <button className="text-red-600 border border-red-600 px-4 py-2 rounded-lg text-sm transition duration-300 hover:bg-red-600 hover:text-white font-medium">
          Xóa
        </button>
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
                <p className="text-gray-600 line-clamp-1">
                  <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                </p>
                </div>
                <div className="">
                  <button
                    onClick={() => handleViewLesson(lesson.id)}
                    className="text-yellow-600 border border-yellow-600 px-3 py-1 text-sm rounded-lg hover:bg-yellow-600 hover:text-white font-medium transition duration-300"
                  >
                    Xem chi tiết
                  </button>
                  <button className="text-red-600 border border-red-600 px-3 py-1 text-sm rounded-lg hover:bg-red-600 hover:text-white font-medium transition duration-300 ml-3">
                    Xóa bài học
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Form tạo bài học mới */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-red-700 border-b border-gray-300 pb-2">
          Tạo bài học mới
        </h2>
        {/* onSubmit={handleCreateLesson} */}
        <form className="space-y-6 max-w-xl" onSubmit={handleCreateLesson}>
          <div>
            <label
              htmlFor="lessonTitle"
              className="block mb-2 text-yellow-600 font-semibold text-gray-700"
            >
              Tiêu đề bài học
            </label>
            <input
              id="lessonTitle"
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              placeholder="Nhập tiêu đề bài học"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lessonContent"
              className="block mb-2 text-yellow-600 font-semibold text-gray-700"
            >
              Nội dung bài học
            </label>
            <MyEditor
              content={lessonContent}
              onChangeContent={handleEditorChange}
            />
          </div>

          <div>
            <label
              htmlFor="lessonVideoUrl"
              className="block mb-2 font-semibold text-gray-700"
            >
              URL video (nếu có)
            </label>
            <input
              id="lessonVideoUrl"
              type="url"
              value={lessonVideoUrl}
              onChange={(e) => setLessonVideoUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              placeholder="Nhập URL video bài học"
            />
          </div>

          {/* Upload ảnh đại diện */}
          <div>
            <label
              htmlFor="lessonImages"
              className="block mb-2 font-semibold text-gray-700"
            >
              Ảnh nội dung bài học (jpg, png) — có thể chọn nhiều ảnh
            </label>
            <input
              id="lessonImages"
              type="file"
              accept="image/*"
              multiple
              ref={lessonImagesRef}
              onChange={(e) => setLessonImages(Array.from(e.target.files))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
          </div>

          {/* Upload file PDF hoặc Word */}
          <div>
            <label
              htmlFor="lessonFile"
              className="block mb-2 font-semibold text-gray-700"
            >
              File tài liệu (PDF, Word)
            </label>
            <input
              id="lessonFile"
              type="file"
              accept=".pdf, .doc, .docx"
              multiple
              ref={lessonFilesRef}
              onChange={(e) => setLessonFiles(Array.from(e.target.files))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loadingLesson}
            className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loadingLesson ? "Đang tạo..." : "Tạo bài học"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default ManageCourseDetailPage;
