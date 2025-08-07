import React, { useEffect, useRef, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { ROUTE_PATH } from "../constants/routePath";

import userService from "../services/userService";

import { LoadingButton } from "@mui/lab";

import { red } from "@mui/material/colors";

const Verify = () => {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  const [conditionPassword, setConditionPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const type = location.state?.type || "register"; // Mặc định là đăng ký nếu không có type

  useEffect(() => {
    if (!email) {
      navigate("/login", { replace: true });
    }
    inputsRef.current[0]?.focus(); // Focus vào ô đầu tiên khi component mount
  }, [email, navigate]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // chỉ cho phép số

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // focus sang ô tiếp theo
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // check mật khẩu có khớp không
  useEffect(() => {
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setCheckPassword(false);
    } else {
      setCheckPassword(true);
    }
  }, [newPassword, confirmPassword]);

  // check điều kiện mật khẩu
  useEffect(() => {
    if (newPassword.length >= 6 && newPassword.length <= 20) {
      setConditionPassword(true);
    } else {
      setConditionPassword(false);
    }
  }, [newPassword]);

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Xử lý xác thực mã OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length < 6) {
      toast.error("Vui lòng nhập đủ 6 chữ số");
      return;
    }

    // Gửi mã xác thực
    try {
      setLoading(true);
      const response = await userService.verifyOtp(email, code);

        if (response.success) {
          toast.success("Xác thực thành công!");
          if (type === "forgot-password") {
            if (checkPassword && conditionPassword) {
              const resetResponse = await userService.resetPassword(
                email,
                newPassword,
              );
              if (resetResponse.success) {
                toast.success("Mật khẩu đã được đổi thành công!");
                navigate(ROUTE_PATH.LOGIN, { replace: true });
              } else {
                toast.error(resetResponse.message);
              }
              setLoading(false);
              return;
            } else {
              toast.error("Mật khẩu không hợp lệ hoặc không khớp");
              setLoading(false);
              return;
            }
          } else if (type === "register") {
            navigate(ROUTE_PATH.LOGIN, { replace: true });
          }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi khi xác thực");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý gửi lại mã OTP
  const handleResendOtp = async () => {
    try {
      setResendLoading(true);

      const response = await userService.resendOtp(email);
      if (response.success) {
        toast.success("Mã OTP đã được gửi lại!");
        setOtp(Array(6).fill("")); // Xoá ô nhập OTP
        inputsRef.current[0]?.focus(); // Focus lại ô đầu
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi khi gửi lại mã OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center font-['Noto_Serif']"
      style={{
        backgroundImage: `url('https://inkythuatso.com/uploads/thumbnails/800/2023/03/hinh-anh-bac-ho-doc-ban-tuyen-ngon-doc-lap-3-04-14-07-55.jpg')`,
      }}
    >
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white opacity-100 backdrop-blur-md rounded-xl overflow-hidden w-full max-w-md shadow-2xl border border-gray-100">
          {/* Header */}
          <div className="bg-red-500 p-3 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-full shadow-lg">
                <i className="fas fa-envelope text-red-500 text-3xl" />
              </div>
            </div>

            {type === "forgot-password" ? (
              <>
                <h1 className="text-2xl font-bold text-yellow-400">
                  LẤY LẠI MẬT KHẨU
                </h1>
                <p className="text-white text-sm mt-1">
                  Nhập mã gồm 6 chữ số được gửi đến email của bạn.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-yellow-400">
                  XÁC THỰC ĐĂNG KÝ
                </h1>
                <p className="text-white text-sm mt-1">
                  Nhập mã gồm 6 chữ số được gửi đến email của bạn.
                </p>
              </>
            )}
          </div>

          {/* Form nhập mã OTP */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            {type === "forgot-password" && (
              <>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mật khẩu mới
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
                      placeholder="Nhập mật khẩu mới"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                    Nhập lại mật khẩu mới
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
              </>
            )}

            {type === "register" ? (
              <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  padding: "10px 0",
                  backgroundColor: "#f32b2bff",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#dc2626",
                    transition: "transform 0.05s",
                    transform: "translateY(-0.5px)",
                  },
                }}
              >
                Xác thực
              </LoadingButton>
            ) : (
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
                    checkPassword && conditionPassword ? red[500] : "grey.400",
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
                Đổi mật khẩu mới
              </LoadingButton>
            )}

            <div className="text-sm text-center text-gray-600 flex items-center justify-center gap-2 flex-wrap mt-4">
              <span>Không nhận được mã?</span>
              <LoadingButton
                onClick={handleResendOtp}
                loading={resendLoading}
                variant="outlined"
                size="small"
                sx={{
                  fontSize: "0.85rem",
                  paddingX: 2,
                  paddingY: 0.5,
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "8px",
                  borderColor: "#d32f2f",
                  color: "#d32f2f",
                  "&:hover": {
                    backgroundColor: "#fcebea",
                    borderColor: "#c62828",
                  },
                  "&.Mui-disabled": {
                    color: "#aaa",
                    borderColor: "#ccc",
                  },
                }}
              >
                Gửi lại mã OTP
              </LoadingButton>
            </div>

            <div className="text-sm text-center text-gray-600">
              <Link
                to={ROUTE_PATH.LOGIN}
                className="text-yellow-400 hover:text-yellow-500 font-medium"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-gray-100 px-6 py-4 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>&copy; 2025 MiiHii110. Good luck with your studies!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
