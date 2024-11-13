const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/sign-token", (req, res) => {
  //   res.json({ message: "You are authorized!" });
  const user = {
    id: 1,
    username: "test",
    password: "test",
  };
  const token = jwt.sign({ user }, process.env.JWT_SECRET);
  // Send the token back to the client
  res.json({ token });
});

router.post("/verify-token", (req, res) => {
  try {
    //   res.json({ message: "Token is valid." });
    const token = req.headers.authorization.split(" ")[1];
    //add in verfy method
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ decoded });
  } catch (error) {
    res.status(401).json({ message: "Token is invalid." });
  }
});

module.exports = router;
