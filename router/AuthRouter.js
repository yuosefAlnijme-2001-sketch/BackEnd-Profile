const express = require("express");

const router = express.Router();

const {
  login,
  singup,
  uploadUserImage,
  resizeImage,
} = require("../services/authServices");
const {
  loginValidate,
  SingInValiadte,
} = require("../utils/validator/authValidator");

router.route("/singup").post(SingInValiadte, singup);
router.route("/login").post(loginValidate, login);
module.exports = router;
