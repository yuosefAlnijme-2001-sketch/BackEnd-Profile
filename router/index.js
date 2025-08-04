const express = require("express");
const UserRouter = require("./userRouter");
const ProjectRouter = require("./projectRouter");
const MessageRouter = require("./messageRouter");
const AuthRouter = require("./AuthRouter");
const router = express.Router();

router.use("/user", UserRouter);
router.use("/project", ProjectRouter);
router.use("/message", MessageRouter);
router.use("/auth", AuthRouter);
module.exports = router;
