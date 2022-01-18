require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
var path = require("path");

const express = require("express");
const app = express();
const User = require("./model/user");

const auth = require("./middleware/auth");

// Middlewares
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("index", {
    baseURL: " https://demo-api-ex.herokuapp.com/api/v1/",
  });
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

    var token = await user.signToken();

    return res.status(201).json({ user: user.userJSON(token) });
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

    if (!user) {
      return res.status(400).json({ error: "Email Not Found" });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      let token = await user.signToken();
      return res.status(200).json({ user: user.userJSON(token) });
    }
    res.status(400).json({ warning: "Invalid Credential" });
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/v1/verifyToken", auth.verifyToken, (req, res, next) => {
  res.status(200).send("Token is Working");
});

module.exports = app;
