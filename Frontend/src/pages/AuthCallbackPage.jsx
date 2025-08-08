import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    const user = query.get("user");

    const parsedUser = user ? JSON.parse(user) : null;

    if (token && parsedUser) {
      // Lưu token
      localStorage.setItem("token", token);

      // Lưu thông tin user
      localStorage.setItem("user", JSON.stringify(parsedUser));

      if (parsedUser.role === "lecturer") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Đang đăng nhập...</div>;
};

export default AuthCallback;
