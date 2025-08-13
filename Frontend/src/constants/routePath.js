export const  ROUTE_PATH = {

    //site routes
    HOME: "/",

    // Authentication routes
    VERIFY: "/verify",
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    AUTH_CALLBACK: "/signin/callback",

    // User management routes
    USER_PROFILE: "/user/profile",

    // Lecturer routes
    LECTURER_STATISTICS: "/lecturer/statistics",

    LECTURER_COURSES: "/lecturer/courses",
    LECTURER_CREATE_COURSE: "/lecturer/courses/create",
    LECTURER_COURSE_DETAIL: "/lecturer/courses/:courseId",

    LECTURER_LESSON_DETAIL: "/lecturer/courses/:courseId/lessons/:lessonId",

    LECTURER_STUDENTS: "/lecturer/students",

    LECTURER_QUESTION_BANK: "/lecturer/question-bank",
    LECTURER_QUESTION_BANK_DETAIL: "/lecturer/question-bank/:courseId",

    LECTURER_QUIZ: "/lecturer/quiz",
    LECTURER_QUIZ_LIST: "/lecturer/quiz/:courseId/list",
    LECTURER_QUIZ_CREATE: "/lecturer/quiz/:courseId/create",
    LECTURER_QUIZ_DETAIL: "/lecturer/quiz/:courseId/:quizId",

    LECTURER_NEWS: "/lecturer/news",

    // Student routes
    // STUDENT_COURSES: "/student/courses",
    STUDENT_COURSE_DETAIL: "/student/courses/:courseId",

    STUDENT_LESSON_DETAIL: "/student/courses/:courseId/lessons/:lessonId",

    STUDENT_QUIZ_TEST: "/student/quiz/:quizId/test",
}
