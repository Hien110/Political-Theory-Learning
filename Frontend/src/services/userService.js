import axios from "axios";

const API_URL = "/api/users"; // sẽ được proxy đến http://localhost:3000/api/users

const userService = {
  // Đăng nhập người dùng
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      // Lưu token vào localStorage (tuỳ bạn muốn lưu ở đâu)
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return { success: true, user, token };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Đăng nhập thất bại. Vui lòng thử lại.",
      };
    }
  },

  // Đăng xuất người dùng
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Đăng ký người dùng
  register: async (name, email, password, yearOfAdmission) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        yearOfAdmission,
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Đăng ký thất bại. Vui lòng thử lại.",
      };
    }
  },

  // Gửi lại OTP
  resendOtp: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/resend-otp`, { email });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Gửi lại OTP thất bại. Vui lòng thử lại.",
      };
    }
  },

  // Xác thực OTP
  verifyOtp: async (email, otp) => {
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, {
        email,
        otp,
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Xác thực OTP thất bại. Vui lòng thử lại.",
      };
    }
  },

  // Đặt lại mật khẩu
  resetPassword: async (email, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, {
        email,
        newPassword,
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Đặt lại mật khẩu thất bại. Vui lòng thử lại.",
      };
    }
  },

  // Cập nhật thông tin người dùng
  updateUser: async (userData) => {
    try {
      const token = userService.getToken();

      const response = await axios.put(
        `${API_URL}/update`,
        {
          name: userData.name,
          yearOfAdmission: userData.yearOfAdmission,
          avatar: userData.avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Cập nhật thông tin thất bại. Vui lòng thử lại.",
      };
    }
  },

  // Thay đổi mật khẩu
  changePassword: async (currentPassword, newPassword) => {
    try {
      const token = userService.getToken();
      console.log(
        currentPassword,
        newPassword,
        "Current and New Passwords in changePassword"
      );

      const response = await axios.put(
        `${API_URL}/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Thay đổi mật khẩu thất bại. Vui lòng thử lại.",
      };
    }
  },

  // Lấy tất cả student
  getAllStudents: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Lấy danh sách sinh viên thất bại. Vui lòng thử lại.",
      };
    }
  },

  // Khóa tài khoản student
  lockStudentAccount: async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/students/lock`, {
        studentId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Khóa tài khoản thất bại. Vui lòng thử lại.",
      };
    }
  },
};

export default userService;
