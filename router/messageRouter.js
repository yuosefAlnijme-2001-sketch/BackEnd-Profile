const express = require("express");

const router = express.Router();

const {
  CreateMessage,
  GetAllMessage,
  GetOneMessage,
  UpdateMessage,
  DeleteMessage,
} = require("../services/sendMessageServices");
const {
  CreateMessageValidate,
  GetMessageValidate,
  UpdateMessageValidate,
  DeleteMessageValidate,
} = require("../utils/validator/messageValidate");
const authServices = require("../services/authServices");
router
  .route("/")
  .post(
    authServices.protect,
    authServices.allowedTo("user", "admin"),
    CreateMessageValidate,
    CreateMessage
  )
  .get(GetAllMessage);
router
  .route("/:id")
  .get(GetMessageValidate, GetOneMessage)
  .put(
    authServices.protect,
    authServices.allowedTo("admin"),
    UpdateMessageValidate,
    UpdateMessage
  )
  .delete(
    authServices.protect,
    authServices.allowedTo("admin"),
    DeleteMessageValidate,
    DeleteMessage
  );

module.exports = router;
