const { check } = require("express-validator");
const slugify = require("slugify");

const validMiddleware = require("../../middlewares/validMiddleware");
const User = require("../../models/user");
const ApiError = require("../ApiError");

exports.SingInValiadte = [
  check("name")
    .notEmpty()
    .withMessage("name required field")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email required field")
    .isEmail()
    .withMessage("Invalid email formate")
    .custom((val) => {
      User.findOne({ email: val }).then((user) => {
        if (user) {
          throw new Error("Email alraedy in account");
        }
      });
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("must be at least 6 chars"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("passwordConfirm is required field")
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error(`Password confirmation is incorrect`);
      }
      return true;
    }),
  check("phone")
    .optional()
    .isMobilePhone("ar-PS")
    .withMessage("accept only palistine phone numbers"),
  validMiddleware,
];

exports.loginValidate = [
  check("email")
    .notEmpty()
    .withMessage("Email required field")
    .isEmail()
    .withMessage("Invalid email formate"),
  check("password").notEmpty().withMessage("Password required"),
  validMiddleware,
];
