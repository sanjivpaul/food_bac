// 01.schema instance:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//2.create schema
const UserSchema = new Schema({
  full_name: { type: String },
  email: { type: String },
  mobile: { type: Number },
  password: { type: String },
});

const UserModel = mongoose.model("user", UserSchema, "users");

//04Export Model:
module.exports = UserModel;
