const mongoose = require("mongoose");
const bcript = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name User Is Required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is Unique"],
    },
    phone: String,
    profileImg: String,
    password: {
      type: String,
      minlength: [6, "Too short password"],
      required: [true, "password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Hash Passwod
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcript.hash(this.password, 12);
  next();
});
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
