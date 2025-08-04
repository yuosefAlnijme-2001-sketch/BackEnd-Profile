const { check } = require("express-validator");
const slugify = require("slugify");

const validMiddleware = require("../../middlewares/validMiddleware");

exports.CreateProjectValidate = [
  check("name")
    .notEmpty()
    .withMessage("Name Is Required...")
    .isLength({ min: 3 })
    .withMessage("Too Short User name...")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("image").notEmpty().withMessage("Image is required"),
  check("UrlProject").notEmpty().withMessage("UrlProject is required"),
  validMiddleware,
];

exports.GetProjectValidate = [
  check("id").isMongoId().withMessage("Invalide Format Id"),
  validMiddleware,
];

exports.DeleteProjectValidate = [
  check("id").isMongoId().withMessage("Invalide Format Id"),
  validMiddleware,
];

exports.UpdateProjectValidate = [
  check("id").isMongoId().withMessage("Invalide Format Id"),
  check("name").custom((val) => {
    req.body.name = slugify(val);
    return true;
  }),
  validMiddleware,
];
