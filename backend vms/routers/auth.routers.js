const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/auth/auth.signup");
const { login } = require("../controllers/auth/auth.login");
const resetController = require("../controllers/auth/auth.reset");
const { forgotPassword } = require("../controllers/auth/auth.forgot"); // ✅ destructure the function
const {verifyEmail} = require("../controllers/auth/auth.verify"); 




router.post("/signup", signup);
router.post("/login", login);

router.post("/request-reset-password", resetController.requestResetPassword);
router.post("/reset-password", resetController.resetPassword);
router.post("/forgot-password", forgotPassword); // ✅ use the actual function
router.get("/verify-email", verifyEmail);

module.exports = router;
// pgjj dogx ffeg akrr
