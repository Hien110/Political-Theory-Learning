const express = require("express");
const router = express.Router();
const UserController = require("../app/controllers/userController");
const authenticateToken = require("../app/middlewares/authMiddleware");
const { authorize } = require("../app/middlewares/authorize");
// Đăng ký người dùng
router.post("/register", UserController.registerUser);
// Xác thực OTP
router.post("/verify-otp", UserController.verifyOtp);
// Đăng nhập người dùng
router.post("/login", UserController.loginUser);
// Lấy tất cả người dùng
router.get("/", authenticateToken, authorize("lecturer"), UserController.getAllUsers);
// Gửi lại OTP
router.post("/resend-otp", UserController.resendOtp);
// Đặt lại mật khẩu
router.post("/reset-password", UserController.resetPassword);
// Cập nhật thông tin người dùng
router.put("/update", authenticateToken, UserController.updateUser);
// Thay đổi mật khẩu
router.put("/change-password", authenticateToken, UserController.changePassword);
// Lấy tất cả student
router.get("/students", authenticateToken, authorize("lecturer"), UserController.getAllStudents);
// Khóa hoặc hủy tài khoản student
router.put("/students/lock", authenticateToken, authorize("lecturer"), UserController.toggleStudentLock);

module.exports = router;