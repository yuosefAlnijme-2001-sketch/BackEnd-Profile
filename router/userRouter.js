const express = require("express");

const {
  CreateUser,
  GetAllUser,
  GetOneUser,
  UpdateUser,
  DeleteUser,
  getLoggedUserData,
  uploadCategorySingleImage,
  resizeImage,
  ChangePassword,
} = require("../services/userServices");
const {
  CreateUserValidate,
  changeUserPasswordValidator,
} = require("../utils/validator/userValidate");
const authServices = require("../services/authServices");
const router = express.Router();

router.get("/getme", authServices.protect, getLoggedUserData, GetOneUser);
router.put(
  "/changePassword/:id",
  authServices.protect,
  authServices.allowedTo("user"),
  changeUserPasswordValidator,
  ChangePassword
);

router
  .route("/")
  .post(
    authServices.protect,
    authServices.allowedTo("admin"),
    CreateUserValidate,
    uploadCategorySingleImage,
    resizeImage,
    CreateUser
  )
  .get(GetAllUser);
router
  .route("/:id")
  .get(GetOneUser)
  .put(
    authServices.protect,
    authServices.allowedTo("admin"),
    uploadCategorySingleImage,
    resizeImage,
    UpdateUser
  )
  .delete(authServices.protect, authServices.allowedTo("admin"), DeleteUser);

module.exports = router;
