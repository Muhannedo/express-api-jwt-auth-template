// /controllers/users.js
const express = require("express");
const router = express.Router();
// Add bcrypt and the user model
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    // Check if the username is already taken
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(400).json({ error: "Username already taken." });
    }
    // Create a new user with hashed password
    const user = await User.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(
        req.body.password,
        parseInt(process.env.SALT_ROUNDS)
      ),
    });
    const token = jwt.sign(
      { username: user.username, _id: user._id },
      process.env.JWT_SECRET
    );
    res.status(201).json({ user, token });
  } catch (error) {
    // Set up for catch
    console.error(error);
    res.status(400).json({ error: "something went wrong." });
  }
});

router.post("/signin", async (req, res) => {
  try {
    //look for the user in the database
    const user = await User.findOne({ username: req.body.username });
    //if the user is there
    if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token });
    } else {
      throw new Error("Username or password is incorrect");
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "invalid credinetials" });
  }
});
module.exports = router;
