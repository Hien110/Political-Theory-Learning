import React, { useState } from "react";
import { toast } from "sonner";

import { ROUTE_PATH } from "../constants/routePath";

import userService from "../services/userService";

import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = ["Trang chủ", "Môn học", "Ôn luyện"];

  // Lấy user từ localStorage (nếu có)
  const userData = JSON.parse(localStorage.getItem("user"));
  const toggleMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    userService.logout();
    toast.success("Đăng xuất thành công");
    window.location.href = ROUTE_PATH.HOME; // Chuyển hướng về trang chủ
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-white shadow-md">
      {/* Top Navbar */}
      <div className="bg-red-500 px-4 py-5 shadow-md">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <i className="fas fa-landmark text-white text-3xl" />
            <h1 className="text-xl font-bold text-white">
              TRI THỨC LÝ LUẬN CHÍNH TRỊ
            </h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:block z-10">
            <ul className="flex items-center space-x-10">
                <li >
                  <Link
                    to={ROUTE_PATH.HOME}
                    className="text-white font-medium hover:text-yellow-300 transition-colors"
                  >
                    Trang chủ
                  </Link>
                </li>
                <li >
                  <a
                    href="#"
                    className="text-white font-medium hover:text-yellow-300 transition-colors"
                  >
                    Môn học
                  </a>
                </li>
                <li >
                  <a
                    href="#"
                    className="text-white font-medium hover:text-yellow-300 transition-colors"
                  >
                    Ôn luyện
                  </a>
                </li>

              {/* User menu */}
              <li className="flex items-center space-x-2">
                {userData ? (
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="rounded-full py-1 px-3 font-semibold cursor-pointer transition duration-300 hover:shadow-md hover:bg-[#fff] hover:text-yellow-400 normal-case border border-white text-white flex items-center focus:outline-none">
                        <PersonIcon className="inline-block mr-2" />
                        {userData.name || userData.email}
                      </MenuButton>
                    </div>

                    <MenuItems className="absolute right-0 z-10 mt-2 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                      <div className="py-1">
                        <MenuItem>
                          <a
                            href="#"
                            className="flex flex-row align-center block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                          >
                            <AccountCircleIcon
                              className=" mr-2 text-yellow-400"
                              style={{ fontSize: "46px" }}
                            />
                            <div>
                              <span className="font-normal">Xin chào,</span>
                              <br />
                              <span className="text-yellow-400 font-semibold text-lg">
                                {userData.name || userData.email}
                              </span>
                            </div>
                          </a>
                        </MenuItem>
                      </div>

                      <div className="py-1">
                        <MenuItem>
                          <Link
                            to={ROUTE_PATH.USER_PROFILE}
                            state={{ user: userData }}
                            className="group block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                          >
                            <div className="inline-block mr-2 transition-transform duration-300 group-hover:animate-slide-profile">
                              <AssignmentIndOutlinedIcon />
                            </div>
                            Hồ sơ cá nhân
                          </Link>
                        </MenuItem>
                      </div>

                      {userData.role === "student" ? (
                        <div  >
                        </div>
                      ) : (
                        <div className="py-1">
                          <MenuItem>
                            <Link
                              to={ROUTE_PATH.LECTURER_STATISTICS}
                              className="group block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                              <div className="inline-block mr-2 transition-transform duration-300 group-hover:animate-slide-profile">
                                <BookOutlinedIcon />
                              </div>
                              Quản lí hệ thống
                            </Link>
                          </MenuItem>
                        </div>
                      )}

                      <div className="py-1">
                        <MenuItem>
                          <a
                            href="#"
                            className="group block px-4 py-2 text-sm text-custom-red data-focus:bg-gray-100 data-focus:outline-hidden"
                            onClick={() => {
                              handleLogout();
                            }}
                          >
                            <div className="inline-block mr-2 transition-transform duration-300 group-hover:animate-slide-shake">
                              <LogoutIcon className="text-custom-red" />
                            </div>
                            Đăng xuất
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                ) : (
                  <Link to="/login">
                    <Button
                      variant="outlined"
                      size="medium"
                      sx={{
                        borderRadius: "9999px",
                        textTransform: "none",
                        color: "#fff",
                        borderColor: "#fff",
                        px: 3,
                        fontWeight: 600,
                        ":hover": {
                          backgroundColor: "#fff",
                          color: "#f59e0b",
                          borderColor: "#f59e0b",
                        },
                      }}
                    >
                      Đăng nhập
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </nav>

          {/* Mobile Toggle Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            <i className="fas fa-bars text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <ul className="flex flex-col">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <a
                  href="#"
                  className="block px-4 py-3 border-b border-gray-100 hover:bg-gray-100 text-red-600 font-semibold"
                  onClick={toggleMenu}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      
    </header>
  );
};

export default Header;
