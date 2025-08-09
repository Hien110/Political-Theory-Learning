import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  // ThemeProvider,
  // createTheme,
  Avatar,
  Typography,
  Divider
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import QuizIcon from '@mui/icons-material/Quiz';

import { yellow } from "@mui/material/colors";

import { ROUTE_PATH } from "../constants/routePath";

const drawerWidth = 240;

const navItems = [
  { label: "Thống kê", icon: <DashboardIcon />, path: ROUTE_PATH.LECTURER_STATISTICS },
  { label: "Quản lý sinh viên", icon: <PeopleIcon />, path: ROUTE_PATH.LECTURER_STUDENTS },
  { label: "Quản lý môn học", icon: <BookIcon />, path: ROUTE_PATH.LECTURER_COURSES },
  { label: "Ngân hàng câu hỏi", icon: <QuizIcon />, path: ROUTE_PATH.LECTURER_QUESTION_BANK },
  { label: "Tin tức", icon: <NewspaperIcon />, path: "/lecturer/news" },
];

// // Theme font Noto Serif
// const lecturerTheme = createTheme({
//   typography: {
//     fontFamily: "'Noto Serif', serif",
//   },
// });

export default function SidebarLecturer({ children }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#fff",
              borderRight: "1px solid #eee"
            },
          }}
        >
          {/* Phần thông tin user */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
          >
            <Avatar
              src={user.avatar || "/default-avatar.png"}
              alt={user.name}
              sx={{
                width: 64,
                height: 64,
                mb: 1,
                border: "2px solid #f1f1f1"
              }}
            />
            <Typography variant="subtitle1" fontWeight={600}>
              {user.name || "Giảng viên"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              {user.role === "lecturer" ? "Giảng viên" : "Người dùng"}
            </Typography>
          </Box>

          <Divider />

          {/* Menu items */}
          <Box
            sx={{
              height: "calc(100vh - 180px)",
              overflowY: "auto",
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
              "&::-webkit-scrollbar-thumb": {
                background: "#bbb",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb:hover": { background: "#999" },
            }}
          >
            <List>
              {navItems.map((item, index) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <ListItemButton
                    key={index}
                    component={Link}
                    to={item.path}
                    sx={{
                      backgroundColor: isActive ? yellow[100] : "transparent",
                      color: isActive ? yellow[700] : "inherit",
                      "&:hover": {
                        backgroundColor: yellow[200],
                        transform: "translateX(4px)",
                        transition: "all 0.2s ease-in-out",
                      },
                      borderRadius: "8px",
                      margin: "4px 8px",
                    }}
                  >
                    <ListItemIcon sx={{ color: isActive ? yellow[700] : "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 600 : 500,
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        </Drawer>

        {/* Nội dung bên phải */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
  );
}
