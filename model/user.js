const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
