const express = require("express");
const passport = require("passport");
const router = express.Router();

// Bắt đầu xác thực với Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google gọi lại URL này sau khi xác thực xong
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    res.redirect("/dashboard"); // Hoặc frontend URL
  }
);

module.exports = router;
