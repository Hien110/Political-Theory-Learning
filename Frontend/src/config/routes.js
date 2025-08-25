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
const CoursePage = React.lazy(() => import("../pages/CoursePage"));
const TestQuizListPage = React.lazy(() => import("../pages/TestQuizListPage"));
const NewsPage = React.lazy(() => import("../pages/NewsPage"));

// user management pages
const UserProfilePage = React.lazy(() => import("../pages/UserProfilePage"));

// lecturer pages
const StatisticsPage = React.lazy(() => import("../pages/StatisticsPage"));

const ManageStudentPage = React.lazy(() => import("../pages/ManageStudentPage"));
const ManageStudentDetailPage = React.lazy(() => import("../pages/ManageStudentDetailPage"));

// Question Bank
const ManageQuestionBankPage = React.lazy(() => import("../pages/ManageQuestionBankPage"));
const ManageQuestionBankDetailPage = React.lazy(() => import("../pages/ManageQuestionBankDetailPage"));

//Courses
const ManageCoursesListPage = React.lazy(() => import("../pages/ManageCoursesListPage"));
const ManageCourseCreatePage = React.lazy(() => import("../pages/ManageCourseCreatePage"));
const ManageCourseDetailPage = React.lazy(() => import("../pages/ManageCourseDetailPage"));

const ManageLessonDetailPage = React.lazy(() => import("../pages/ManageLessonDetailPage"));

//Quiz
const ManageQuizPage = React.lazy(() => import("../pages/ManageQuizPage"));
const ManageQuizListPage = React.lazy(() => import("../pages/ManageQuizListPage"));
const ManageQuizCreatePage = React.lazy(() => import("../pages/ManageQuizCreatePage"));
const ManageQuizDetailPage = React.lazy(() => import("../pages/ManageQuizDetailPage"));

const ManageQuizResultPage = React.lazy(() => import("../pages/ManageQuizResultPage"));
const ManageQuizResultCoursePage = React.lazy(() => import("../pages/ManageQuizResultCoursePage"));
const ManageQuizResultDetailPage = React.lazy(() => import("../pages/ManageQuizResultDetailPage"));

const ManageNewsPage = React.lazy(() => import("../pages/ManageNewsPage"));

// Student pages
const CourseDetailPage = React.lazy(() => import("../pages/CourseDetailPage"));

const LessonDetailPage = React.lazy(() => import("../pages/LessonDetailPage"));

const TestQuizPage = React.lazy(() => import("../pages/TestQuizPage"));
const TestQuizResultPage = React.lazy(() => import("../pages/TestQuizResultPage"));

const AppRoutes = [

  // Authentication routes
  { path: ROUTE_PATH.LOGIN, page: LoginPage },
  { path: ROUTE_PATH.REGISTER, page: RegisterPage },
  { path: ROUTE_PATH.VERIFY, page: VerifyPage },
  { path: ROUTE_PATH.FORGOT_PASSWORD, page: ForgotPassword },
  { path: ROUTE_PATH.AUTH_CALLBACK, page: AuthCallbackPage },

  // Site routes
  { path: ROUTE_PATH.HOME, page: HomePage, layout: studentLayout },
  { path: ROUTE_PATH.COURSE, page: CoursePage, layout: studentLayout },
  { path: ROUTE_PATH.TEST_QUIZ_LIST, page: TestQuizListPage, layout: studentLayout },
  { path: ROUTE_PATH.NEWS, page: NewsPage, layout: studentLayout },

  // User management routes
  { path: ROUTE_PATH.USER_PROFILE, page: UserProfilePage, layout: studentLayout},
  { path: ROUTE_PATH.LECTURER_STUDENT_DETAIL, page: ManageStudentDetailPage, layout: lecturerLayout, allowedRoles: ["lecturer"] },

  // lecturer routes
  { path: ROUTE_PATH.LECTURER_STATISTICS, page: StatisticsPage, layout: lecturerLayout, allowedRoles: ["lecturer"] },
  { path: ROUTE_PATH.LECTURER_STUDENTS, page: ManageStudentPage, layout: lecturerLayout, allowedRoles: ["lecturer"] },

  // Question Bank
  { path: ROUTE_PATH.LECTURER_QUESTION_BANK, page: ManageQuestionBankPage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },
  { path: ROUTE_PATH.LECTURER_QUESTION_BANK_DETAIL, page: ManageQuestionBankDetailPage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },

  //Courses
  { path: ROUTE_PATH.LECTURER_COURSES, page: ManageCoursesListPage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },
  { path: ROUTE_PATH.LECTURER_CREATE_COURSE, page: ManageCourseCreatePage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },
  { path: ROUTE_PATH.LECTURER_COURSE_DETAIL, page: ManageCourseDetailPage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },

  { path: ROUTE_PATH.LECTURER_LESSON_DETAIL, page: ManageLessonDetailPage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },

  //Quiz
  { path: ROUTE_PATH.LECTURER_QUIZ, page: ManageQuizPage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },
  { path: ROUTE_PATH.LECTURER_QUIZ_LIST, page: ManageQuizListPage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },
  { path: ROUTE_PATH.LECTURER_QUIZ_CREATE, page: ManageQuizCreatePage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },
  { path: ROUTE_PATH.LECTURER_QUIZ_DETAIL, page: ManageQuizDetailPage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },

  { path: ROUTE_PATH.LECTURER_QUIZ_RESULT, page: ManageQuizResultPage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },
  { path: ROUTE_PATH.LECTURER_QUIZ_RESULT_LIST, page: ManageQuizResultCoursePage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },
  { path: ROUTE_PATH.LECTURER_QUIZ_RESULT_DETAIL, page: ManageQuizResultDetailPage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },

  { path: ROUTE_PATH.LECTURER_NEWS, page: ManageNewsPage, layout: lecturerLayout, allowedRoles: ["lecturer"]  },

  //Student routes
  { path: ROUTE_PATH.STUDENT_COURSE_DETAIL, page: CourseDetailPage, layout: studentLayout },

  { path: ROUTE_PATH.STUDENT_LESSON_DETAIL, page: LessonDetailPage, layout: studentLayout },

  { path: ROUTE_PATH.STUDENT_QUIZ_TEST, page: TestQuizPage },
  { path: ROUTE_PATH.STUDENT_QUIZ_RESULT, page: TestQuizResultPage, layout: studentLayout }
];

export default AppRoutes;