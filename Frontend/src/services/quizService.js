import axios from "axios";

import userService from "./userService";

const API_URL = "/api/quizzes";

const QuizService = {
  getQuizzesByCourse: async (courseId) => {
    try {
      const response = await axios.get(`${API_URL}/${courseId}/quizzes`);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      throw error;
    }
  },

  createQuiz: async (courseId, newQuiz) => {

    try {
      const response = await axios.post(
        `${API_URL}/${courseId}/quizzes`,
        newQuiz,
        {
          headers: {
            Authorization: `Bearer ${userService.getToken()}`,
          },
        }
      );
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Lỗi khi tạo quiz",
      };
    }
  },
};

export default QuizService;
