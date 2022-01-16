require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const express = require("express");
const app = express();
const User = require("./model/user");

const auth = require("./middleware/auth");

// Middlewares
app.use(express.json());

app.get("/", async (req, res) => {
  res.send(
    'Link is meant for "POST" requests only. Please visit https://github.com/Roaming-Developer/Basic-Login-and-Register-API/ for more information'
  );
});

app.post("/api/v1/register", async (req, res) => {
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

app.post("/api/v1/login", async (req, res) => {
  // Login
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status("400").json({
        error: {
          body: "All Field are required",
        },
      });
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      res.status(200).json(user);
    }
    res.status(400).json({ warning: "Invalid Credential" });
  } catch (error) {
    console.error(error);
  }
});

app.post("/verifyToken", auth.verifyToken, (req, res, next) => {
  res.status(200).send("Token is Working");
});

module.exports = app;
