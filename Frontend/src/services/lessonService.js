import axios from "axios";

const API_URL = "/api/lessons"; 

const lessonService = {

    // Tạo bài học
    createLesson: async (newLesson) => {
        try {
            const response = await axios.post(`${API_URL}/${newLesson.course}/lessons`, newLesson);
            return {
                success: true,
                data: response.data,
                message: response.data.message,
            };
        } catch (error) {
            console.error("Lỗi khi tạo bài học:", error);
            return { success: false, message: "Tạo bài học thất bại" };
        }
    },

    // Lấy bài học theo môn
    getLessonsByCourse: async (courseId) => {
        try {
            const response = await axios.get(`${API_URL}/${courseId}/lessons`);
            return {
                success: true,
                data: response.data.data,
                message: response.data.message,
            };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bài học:", error);
            return { success: false, message: "Lấy danh sách bài học thất bại" };
        }
    },

    // Lấy bài học theo Id
    getLessonById: async (lessonId) => {
        try {
            const response = await axios.get(`${API_URL}/lessons/${lessonId}`);
            return {
                success: true,
                data: response.data,
                message: response.data.message,
            };
        } catch (error) {
            console.error("Lỗi khi lấy bài học:", error);
            return { success: false, message: "Lấy bài học thất bại" };
        }
    }
};

export default lessonService;

