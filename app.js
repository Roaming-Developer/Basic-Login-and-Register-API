require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const express = require("express");
const app = express();
const User = require("./model/user");

// Middlewares
app.use(express.json());

app.post("/register", async (req, res) => {
  // Register
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).json({
        error: {
          body: "All Fields Are Required",
        },
      });
    }

    const odlUser = await User.findOne({ email });

    if (odlUser) {
      return res.status(409).json({
        error: {
          body: "Already Registed with this email",
        },
      });
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
});

app.post("/login", async (req, res) => {
  // Login
});

module.exports = app;
