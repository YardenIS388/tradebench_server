const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    password: { type: String, requires: true },
    email: { type: String, required: true, unique: true },
  },
  { collection: "users" }
);

module.exports = model("User", userSchema);
