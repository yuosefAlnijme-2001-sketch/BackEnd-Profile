const { check } = require("express-validator");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");

const User = require("../../models/user");
const validMiddleware = require("../../middlewares/validMiddleware");

exports.CreateUserValidate = [
  check("name")
    .notEmpty()
    .withMessage("Name Is Required...")
    .isLength({ min: 3 })
    .withMessage("Too Short User name...")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalide Email Address")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in user"));
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 charecter"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password Confirm required")
    .custom((password, { req }) => {
      if (req.body.password !== password) {
        throw new Error("Password Confirm incorrect");
      }
      return true;
    }),
  check("profileImg").optional(),
  check("role").optional(),
  check("phone")
    .optional()
    .isMobilePhone(["ar-PS", "ar-EG"])
    .withMessage("Invalid Phone Mobile number only palistine and Egpt"),
  validMiddleware,
];

exports.GetUserValidate = [
  check("id").isMongoId().withMessage("Invalide Format Id"),
  validMiddleware,
];

exports.DeleteUserValidate = [
  check("id").isMongoId().withMessage("Invalide Format Id"),
  validMiddleware,
];

exports.UpdateUserValidate = [
  check("id").isMongoId().withMessage("Invalide Format Id"),
  check("name").custom((val) => {
    req.body.name = slugify(val);
    return true;
  }),
  validMiddleware,
];

exports.changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid format id"),
  check("currentPassword").notEmpty().withMessage("Please Inter Old Password"),
  check("passwordConfirm").notEmpty().withMessage("Please Inter New Password"),
  check("password")
    .notEmpty()
    .withMessage("Please Inter confirm New Password")
    .custom(async (val, { req }) => {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("There is no user for this id");
      }
      const isCurrentPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCurrentPassword) {
        throw new Error("Please enter a correct password.");
      }

      if (req.body.passwordConfirm !== val) {
        throw new Error("new_Password or confirmNewPassword is not correct");
      }
      return true;
    }),
  validMiddleware,
];
