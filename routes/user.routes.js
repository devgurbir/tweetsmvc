const express = require("express");
const {
  getAllUsers,
  showCreatePage,
  createUser,
} = require("../controller/user.controller");
const router = express.Router();
const upload = require("../utils/fileUpload");

router.get("/", getAllUsers);
router.get("/create", showCreatePage);
router.post("/create", createUser);

module.exports = router;
