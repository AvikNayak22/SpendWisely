const express = require("express");
const {
  loginController,
  registerController,
  logoutController,
} = require("../controllers/userController");

//router object
const router = express.Router();

//routes
// POST || LOGIN USER
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);

//POST || LOGOUT USER
router.post("/logout", logoutController);

module.exports = router;
