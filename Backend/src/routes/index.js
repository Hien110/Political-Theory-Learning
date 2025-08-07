const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");

function route(app) {
    app.use("/api/users", userRoutes);
    app.use("/api/auth", authRoutes);
}


module.exports = route;