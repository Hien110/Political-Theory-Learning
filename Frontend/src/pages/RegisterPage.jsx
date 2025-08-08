import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { ROUTE_PATH } from "../constants/routePath";

import userService from "../services/userService";

import { toast } from "sonner";

import { LoadingButton } from "@mui/lab";

import { red } from "@mui/material/colors";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  const [conditionPassword, setConditionPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // check mật khẩu có khớp không
  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setCheckPassword(false);
    } else {
      setCheckPassword(true);
    }
  }, [password, confirmPassword]);

  // check điều kiện mật khẩu
  useEffect(() => {
    if (password.length >= 6 && password.length <= 20) {
      setConditionPassword(true);
    } else {
      setConditionPassword(false);
    }
  }, [password]);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Xử lý đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const yearOfAdmission = e.target.yearOfAdmission.value;

    try {
      setLoading(true);
      const result = await userService.register(
        name,
        email,
        password,
        yearOfAdmission
      );

      if (result.success) {
        toast.success(result.message);
        navigate(ROUTE_PATH.VERIFY, {
          state: {
            email,
            type: "register",
          },
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi khi đăng ký");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center font-['Noto_Serif']"
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
          <div className="bg-red-500 p-2 text-center">
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
          <div className="p-8 pt-4">
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Họ Và Tên
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border"
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Khóa học
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-calendar text-gray-400" />
                  </div>
                  <select
                    id="yearOfAdmission"
                    name="yearOfAdmission"
                    defaultValue=""
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border"
                  >
                    <option value="" disabled>
                      Chọn khóa học
                    </option>
                    <option value="16">K16</option>
                    <option value="17">K17</option>
                    <option value="18">K18</option>
                    <option value="19">K19</option>
                    <option value="20">K20</option>
                    <option value="21">K21</option>
                    <option value="22">K22</option>
                    <option value="23">K23</option>
                  </select>
                </div>
              </div>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nhập lại mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    name="confirm-password"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border"
                    placeholder="Nhập lại mật khẩu"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={toggleConfirmPassword}
                  >
                    <i
                      className={`fas ${
                        showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                      } text-gray-400 hover:text-gray-600 cursor-pointer`}
                    />
                  </button>
                </div>
              </div>
              {!checkPassword && (
                <div className="text-red-500 text-sm mt-1">
                  Mật khẩu không khớp
                </div>
              )}

              {!conditionPassword ? (
                <div className="text-red-500 text-sm mt-1">
                  Mật khẩu phải từ 6 đến 20 ký tự
                </div>
              ) : null}
              <div>
                <LoadingButton
                  type="submit"
                  loading={loading}
                  disabled={!(checkPassword && conditionPassword)}
                  disableElevation
                  fullWidth
                  sx={{
                    py: "8px",
                    px: "16px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    borderRadius: "6px",
                    textTransform: "none",
                    color: "white",
                    bgcolor:
                      checkPassword && conditionPassword
                        ? red[500]
                        : "grey.400",
                    transition:
                      "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor:
                        checkPassword && conditionPassword
                          ? red[600]
                          : "grey.400",
                      transform:
                        checkPassword && conditionPassword
                          ? "translateY(-2px)"
                          : "none",
                    },
                    "&.Mui-disabled": {
                      color: "white",
                      bgcolor: "grey.400",
                      cursor: "not-allowed",
                      opacity: 1, // Giữ nguyên màu, tránh bị MUI làm mờ
                    },
                  }}
                >
                  <i
                    className="fas fa-sign-in-alt"
                    style={{ marginRight: 8 }}
                  />
                  ĐĂNG KÝ
                </LoadingButton>
              </div>
            </form>

            <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
              <div className="text-center text-sm text-gray-600">
                Đã có tài khoản?{" "}
                <Link
                  to={ROUTE_PATH.LOGIN}
                  className="font-medium text-yellow-400 hover:text-yellow-500"
                >
                  Đăng nhập ngay
                </Link>
              </div>
              <div className="text-sm"></div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-100 px-6 py-4 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>&copy; 2025 MiiHii110. Good luck with your studies!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
