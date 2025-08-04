const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

const Factore = require("./handelFactor");
const Project = require("../models/projectModel");
const { uploadSingleImage } = require("../middlewares/uploadMiddleware");

exports.uploadCategoryImage = uploadSingleImage("image");

// controler in width and hight and qulty
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `project-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .toFormat("jpg")
      .jpeg({ quality: 100 })
      .toFile(`uploads/project/${filename}`);

    // Save image into our db
    req.body.image = filename;
  }
  next();
});

//@desc Create Project
//@route POST /api/project
//@access Private
exports.CreateProject = Factore.createOne(Project);

//@desc Get projects
//@route GET /api/project
//@access Public
exports.GetAllProject = Factore.getAll(Project);

//@desc Get project
//@route GET /api/project
//@access Bublic
exports.GetOneProject = Factore.getOne(Project);

//@desc Update project
//@route put /api/project
//@access Private
exports.UpdateProject = Factore.updateOne(Project);

//@desc Delete project
//@route delete /api/project
//@access Private
exports.DeleteProject = Factore.deleteOne(Project);
