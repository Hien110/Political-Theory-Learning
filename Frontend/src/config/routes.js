import React from "react";

import { ROUTE_PATH } from "../constants/routePath";

import studentLayout from "../layouts/student-layout";

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
];

export default AppRoutes;