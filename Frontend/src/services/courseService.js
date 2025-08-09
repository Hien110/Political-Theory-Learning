import axios from "axios";
import userService from "./userService";

const API_URL = "/api/courses";

const courseService = {
  createCourse: async (newCourse) => {
    try {
      const token = userService.getToken();
      const response = await axios.post(`${API_URL}/create`, newCourse, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        success: true,
        message: response.data.message,
        course: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Tạo khóa học thất bại",
      };
    }
  },

  // Lấy khóa học theo người tạo
  getCoursesByInstructor: async () => {
    try {
      const response = await axios.get(`${API_URL}/instructor`, {
        headers: {
          Authorization: `Bearer ${userService.getToken()}`,
        },
      });
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Lỗi khi lấy khóa học theo giảng viên",
      };
    }
  },
};

export default courseService;
