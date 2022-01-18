const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
// require("dotenv").config();

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

userSchema.methods.signToken = async function () {
  var payload = { userId: this.id, email: this.email };
  console.log(payload);
  try {
    var token = jwt.sign(payload, process.env.TOKEN_KEY);
    return token;
  } catch (error) {
    return error;
  }
};

userSchema.methods.userJSON = function (token) {
  return {
    name: this.first_name + " " + this.last_name,
    email: this.email,
    token: token,
  };
};

module.exports = mongoose.model("User", userSchema);
