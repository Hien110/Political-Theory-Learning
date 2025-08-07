import React from "react";

import { ROUTE_PATH } from "../constants/routePath";

// Authentication pages
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/RegisterPage"));
const VerifyPage = React.lazy(() => import("../pages/VerifyPage"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));

const AppRoutes = [

  // Authentication routes
  { path: ROUTE_PATH.LOGIN, page: LoginPage },
  { path: ROUTE_PATH.REGISTER, page: RegisterPage },
  { path: ROUTE_PATH.VERIFY, page: VerifyPage },
  { path: ROUTE_PATH.FORGOT_PASSWORD, page: ForgotPassword }
];

export default AppRoutes;