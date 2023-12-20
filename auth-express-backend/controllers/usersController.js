const express = require("express");
const bcrypt = require("bcryptjs");
const { checkName } = require("../validations/checkUser.js")
const {
  getOneUser,
  getOneUserByEmail,
  createUser,
} = require("../queries/users.js");
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const users = express.Router();

users.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const oneUser = await getOneUser(userId);
  if (oneUser) {
    res.json(oneUser);
  } else {
    res.status(404).json({ error: "User Not Found" });
  }
});

// LOGIN ROUTE
users.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getOneUserByEmail(email);
    if(user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.json({message: "Login successful", user});
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// SIGN UP ROUTE
users.post("/", async (req, res) => {
  try {
    console.log("Request Body:", req.body)
    const { password, ...userData } = req.body;
    console.log("Processed User Data:", userData);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await createUser({
      ...userData,
      password: hashedPassword,
    })
    res.json(createdUser);
  } catch (error) {
    res.status(500).json({ error: "Error Creating User" });
  }
});



module.exports = users;
