import React, { useState } from "react";

import { ROUTE_PATH } from "../constants/routePath";

import userService from "../services/userService";

import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await userService.login(email, password);

      if (result.success) {
        toast.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        toast.error(result.message); // Hiển thị lỗi ở góc phải trên
      }
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi khi đăng nhập");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://inkythuatso.com/uploads/thumbnails/800/2023/03/hinh-anh-bac-ho-doc-ban-tuyen-ngon-doc-lap-3-04-14-07-55.jpg')`,
      }}
    >
      {/* Lớp phủ mờ */}
      {/* <div className="absolute inset-0 opacity-100 bg-black z-1" /> */}

      {/* Container chính */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="login-container bg-white opacity-100 backdrop-blur-md rounded-xl overflow-hidden w-full max-w-md shadow-2xl transition-all hover:shadow-2xl border border-gray-100">
          {/* Header */}
          <div className="bg-red-500 p-3 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-full shadow-lg">
                <i className="fas fa-landmark text-red-500 text-3xl" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-yellow-400">
              TRI THỨC LÝ LUẬN CHÍNH TRỊ
            </h1>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border"
                    placeholder="Nhập email"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePassword}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      } text-gray-400 hover:text-gray-600 cursor-pointer`}
                    />
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 bg-red-500 hover:bg-red-600 transition-transform duration-200 ease-in-out hover:-translate-y-0.5"
                >
                  <i className="fas fa-sign-in-alt mr-2" /> ĐĂNG NHẬP
                </button>
              </div>
            </form>

            <div className="mt-6 flex items-center text-sm text-gray-500">
              <div className="flex-grow border-t border-gray-200 mr-3" />
              HOẶC ĐĂNG NHẬP BẰNG
              <div className="flex-grow border-t border-gray-200 ml-3" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href="https://political-theory-learning.onrender.com/api/auth/google"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <i className="fab fa-google text-red-500 mr-2 mt-1" /> Google
              </a>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={(e) => {
                  e.preventDefault();
                  toast(
                    "Tính năng đăng nhập bằng Microsoft hiện chưa được triển khai."
                  );
                }}
              >
                <i className="fab fa-microsoft text-blue-500 mr-2 mt-1" />{" "}
                Microsoft
              </a>
            </div>

            <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
              <div className="text-center text-sm text-gray-600">
                Chưa có tài khoản?{" "}
                <Link
                  to={ROUTE_PATH.REGISTER}
                  className="font-medium text-yellow-400 hover:text-yellow-500"
                >
                  Đăng ký ngay
                </Link>
              </div>
              <div className="text-sm">
                <Link
                  to={ROUTE_PATH.FORGOT_PASSWORD}
                  className="font-medium text-yellow-400 hover:text-yellow-500"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-100 px-6 py-4 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>&copy; 2025 MiiHii. Good luck with your studies!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
