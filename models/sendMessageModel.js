const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: [2, "Too short name"],
    },
    email: {
      type: String,
    },
    message: {
      type: String,
      minlength: [2, "Too short message"],
      maxlength: [32, "Too long message"],
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;
