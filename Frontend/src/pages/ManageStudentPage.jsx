import React, { useEffect, useState } from "react";
import userService from "../services/userService";
import { Dialog, DialogTitle, DialogContent, Avatar } from "@mui/material";

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

function ManageStudentPage() {
  const [allStudents, setAllStudents] = useState([]);
  const [showLockModal, setShowLockModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const closeModals = () => {
    setShowLockModal(false);
  };
  const fetchStudents = async () => {
    try {
      const res = await userService.getAllStudents();
      setAllStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleLockStudent = async (studentId) => {
    try {
      const res = await userService.lockStudentAccount(studentId);
      if (res.success) {
        toast.success(res.message);
        setShowLockModal(false);
        fetchStudents();
      }
    } catch (error) {
      console.error("Failed to lock student account:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "locked":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white">
      <h1 className="text-3xl font-bold mb-6 text-black">Quản lý sinh viên</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="p-4 border-b text-left font-semibold">Avatar</th>
              <th className="p-4 border-b text-left font-semibold">Họ tên</th>
              <th className="p-4 border-b text-left font-semibold">Email</th>
              <th className="p-4 border-b text-left font-semibold">Khóa học</th>
              <th className="p-4 border-b text-left font-semibold">
                Trạng thái
              </th>
              <th className="p-4 border-b text-center font-semibold">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {allStudents.map((student) => (
              <tr
                key={student._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-30 h-35 rounded-sm object-cover border border-gray-200 shadow-sm"
                  />
                </td>
                <td className="p-4 font-medium text-gray-800">
                  {student.name}
                </td>
                <td className="p-4 text-gray-600">{student.email}</td>
                <td className="p-4">K{student.yearOfAdmission || "-"}</td>
                <td
                  className={`p-4 font-semibold ${getStatusColor(
                    student.status
                  )}`}
                >
                  {student.status === "locked"
                    ? "Đã khóa"
                    : student.status === "non-active"
                    ? "Chưa kích hoạt"
                    : "Đang hoạt động"}
                </td>
                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => {
                      setShowLockModal(true);
                      setSelectedStudent(student);
                    }}
                    className={`cursor-pointer px-4 py-1.5 rounded-lg text-white font-medium shadow-sm transition-all ${
                      student.status === "locked"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {student.status === "locked" ? "Mở khóa" : "Khóa"}
                  </button>
                  <button className="cursor-pointer px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all">
                    Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showLockModal && (
          <motion.div
            className="fixed inset-0 bg-[#000000c4] flex w-full justify-center items-center z-1200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-red-500 mb-4">
                {selectedStudent?.status === "locked" ? "Mở khóa tài khoản" : "Khóa tài khoản"}
              </h2>
              <p className="text-gray-600 mb-4">
                Bạn có chắc chắn muốn {selectedStudent?.status === "locked" ? "mở khóa" : "khóa"} tài khoản của sinh viên{" "}
                <span className="font-semibold text-red-500">
                  {selectedStudent?.name}
                </span>{" "}
                không?
              </p>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLockStudent(selectedStudent?._id);
                }}
              >
                {/* Buttons */}
                <div className="text-right space-x-2 flex justify-end">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="px-4 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-300 cursor-pointer w-full text-[14px]"
                  >
                    Hủy
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white transition-colors duration-300 cursor-pointer w-full text-[14px]"
                  >
                    {selectedStudent?.status === "locked" ? "Mở khóa" : "Khóa"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ManageStudentPage;
