import React from 'react'

function CourseDetailCard({ course }) {
  return (
    <div className="">
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

          <h1 className="text-3xl font-bold mb-6 text-red-700">
            {course.title}
          </h1>

          <div
            className="prose prose-red max-w-full mb-12 text-gray-700 "
            dangerouslySetInnerHTML={{
              __html: course.description || "<p>Không có mô tả</p>",
            }}
          />
        </div>
  )
}

export default CourseDetailCard
