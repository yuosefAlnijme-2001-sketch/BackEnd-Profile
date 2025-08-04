const express = require("express");

const router = express.Router();

const {
  uploadCategoryImage,
  resizeImage,
  CreateProject,
  GetAllProject,
  GetOneProject,
  UpdateProject,
  DeleteProject,
} = require("../services/projectServices");
const {
  CreateProjectValidate,
  GetProjectValidate,
  DeleteProjectValidate,
  UpdateProjectValidate,
} = require("../utils/validator/projectValidate");

const authServices = require("../services/authServices");

router
  .route("/")
  .post(
    authServices.protect,
    authServices.allowedTo("admin"),
    uploadCategoryImage,
    resizeImage,
    CreateProjectValidate,
    CreateProject
  )
  .get(GetAllProject);
router
  .route("/:id")
  .get(GetProjectValidate, GetOneProject)
  .put(
    authServices.protect,
    authServices.allowedTo("admin"),
    uploadCategoryImage,
    resizeImage,
    UpdateProjectValidate,
    UpdateProject
  )
  .delete(
    authServices.protect,
    authServices.allowedTo("admin"),
    DeleteProjectValidate,
    DeleteProject
  );

module.exports = router;
