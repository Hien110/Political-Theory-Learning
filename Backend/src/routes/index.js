const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const courseRoutes = require("./course.routes");

function route(app) {
    app.use("/api/users", userRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/courses", courseRoutes);
}


module.exports = route;