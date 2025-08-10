import React from "react";

import { ROUTE_PATH } from "../constants/routePath";

import studentLayout from "../layouts/student-layout";
import lecturerLayout from "../layouts/lecturer-layout";

// Authentication pages
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/RegisterPage"));
const VerifyPage = React.lazy(() => import("../pages/VerifyPage"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));
const AuthCallbackPage = React.lazy(() => import("../pages/AuthCallbackPage"));

// Site pages
const HomePage = React.lazy(() => import("../pages/HomePage"));

// user management pages
const UserProfilePage = React.lazy(() => import("../pages/UserProfilePage"));

// lecturer pages
const StatisticsPage = React.lazy(() => import("../pages/StatisticsPage"));
const ManageStudentPage = React.lazy(() => import("../pages/ManageStudentPage"));
const ManageQuestionBankPage = React.lazy(() => import("../pages/ManageQuestionBankPage"));

const ManageCoursesListPage = React.lazy(() => import("../pages/ManageCoursesListPage"));
const ManageCourseCreatePage = React.lazy(() => import("../pages/ManageCourseCreatePage"));
const ManageCourseDetailPage = React.lazy(() => import("../pages/ManageCourseDetailPage"));

const ManageLessonDetailPage = React.lazy(() => import("../pages/ManageLessonDetailPage"));

const ManageNewsPage = React.lazy(() => import("../pages/ManageNewsPage"));

const AppRoutes = [

  // Authentication routes
  { path: ROUTE_PATH.LOGIN, page: LoginPage },
  { path: ROUTE_PATH.REGISTER, page: RegisterPage },
  { path: ROUTE_PATH.VERIFY, page: VerifyPage },
  { path: ROUTE_PATH.FORGOT_PASSWORD, page: ForgotPassword },
  { path: ROUTE_PATH.AUTH_CALLBACK, page: AuthCallbackPage },

  // Site routes
  { path: ROUTE_PATH.HOME, page: HomePage, layout: studentLayout },

  // User management routes
  { path: ROUTE_PATH.USER_PROFILE, page: UserProfilePage, layout: studentLayout },

  // lecturer routes
  { path: ROUTE_PATH.LECTURER_STATISTICS, page: StatisticsPage, layout: lecturerLayout },
  { path: ROUTE_PATH.LECTURER_STUDENTS, page: ManageStudentPage, layout: lecturerLayout },
  { path: ROUTE_PATH.LECTURER_QUESTION_BANK, page: ManageQuestionBankPage, layout: lecturerLayout },

  { path: ROUTE_PATH.LECTURER_COURSES, page: ManageCoursesListPage, layout: lecturerLayout },
  { path: ROUTE_PATH.LECTURER_CREATE_COURSE, page: ManageCourseCreatePage, layout: lecturerLayout },
  { path: ROUTE_PATH.LECTURER_COURSE_DETAIL, page: ManageCourseDetailPage, layout: lecturerLayout },

  { path: ROUTE_PATH.LECTURER_LESSON_DETAIL, page: ManageLessonDetailPage, layout: lecturerLayout },

  { path: ROUTE_PATH.LECTURER_NEWS, page: ManageNewsPage, layout: lecturerLayout },

];

export default AppRoutes;