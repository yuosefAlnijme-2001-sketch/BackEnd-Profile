const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcript = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const User = require("../models/user");
const ApiError = require("../utils/ApiError");

const { uploadSingleImage } = require("../middlewares/uploadMiddleware");

exports.uploadUserImage = uploadSingleImage("image");

// controler in width and hight and qulty
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .toFormat("jpg")
      .jpeg({ quality: 100 })
      .toFile(`uploads/user/${filename}`);

    // Save image into our db
    req.body.profileImg = filename;
  }
  next();
});

exports.singup = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });

  const token = await jwt.sign(
    { userId: user._id },
    process.env.JWT_KEY_SECRIPT,
    { expiresIn: process.env.EXPIRES }
  );

  res.status(201).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcript.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password"));
  }

  const token = await jwt.sign(
    { userId: user._id },
    process.env.JWT_KEY_SECRIPT,
    { expiresIn: process.env.EXPIRES }
  );

  res.status(201).json({ data: user, token });
});

// للتاكد من ان المستخدم سجل دخول او لا
exports.protect = asyncHandler(async (req, res, next) => {
  // 1) check if token exeist , if exsit get
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("You are not login , please login first", 401));
  }
  // 2) Verify token
  const decoded = jwt.verify(token, process.env.JWT_KEY_SECRIPT);
  // 3) check if user exsist
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "the user that belong to this token does no longer exist",
        401
      )
    );
  }
  // 4) check if user change his password after token created
  if (currentUser.passwordchangeAt) {
    const passChangeGetTime = parseInt(
      currentUser.passwordchangeAt.getTime() / 1000,
      10
    );
    if (passChangeGetTime > decoded.iat) {
      // Password changed after token create
      return next(
        new ApiError(
          "User recently change his password , please login again...",
          401
        )
      );
    }
  }
  req.user = currentUser;
  next();
});

// @desc    Authorization (User Permissions)
// ["admin", "manager"]

exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1) access role
    // 2) access user
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });
