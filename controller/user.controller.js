const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const mongoose = require("mongoose");

const upload = require("../utils/fileUpload");

const generateToken = require("../utils/generateToken");

router.get("/", async (req, res) => {
  const per_page = req.query.per_page || 3;
  const page = req.query.page || 1;
  const totalUsers = await User.find().count();
  const users = await User.find()
    .skip((page - 1) * per_page)
    .limit(per_page);
  if (!users) return res.status(404).json({ msg: "No users found" });

  res.render("users", { users: users, total: totalUsers });
});

router.get("/create", async (req, res) => {
  res.render("createUser");
});

router.post("/create", upload.single("avatar"), async (req, res) => {
  console.log(req.body);
  const user = await User.create({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    email: req.body.email,
  });

  const token = generateToken(user);

  res.status(201).send({ data: { user, token } });
});

module.exports = router;
