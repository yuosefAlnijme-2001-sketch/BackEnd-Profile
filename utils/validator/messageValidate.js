const { check } = require("express-validator");

const validMiddleware = require("../../middlewares/validMiddleware");

exports.CreateMessageValidate = [
  check("name")
    .notEmpty()
    .withMessage("Name Is Required...")
    .isLength({ min: 2 })
    .withMessage("Too Short User name..."),
  check("email")
    .notEmpty()
    .withMessage("E_mail is reqired")
    .isEmail()
    .withMessage("Invalid E_mail"),
  check("message")
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Message behine 2 to 32"),
  validMiddleware,
];

exports.GetMessageValidate = [
  check("id").isMongoId().withMessage("Invalide Format Id"),
  validMiddleware,
];

exports.DeleteMessageValidate = [
  check("id").isMongoId().withMessage("Invalide Format Id"),
  validMiddleware,
];

exports.UpdateMessageValidate = [
  check("id").isMongoId().withMessage("Invalide Format Id"),
  validMiddleware,
];
