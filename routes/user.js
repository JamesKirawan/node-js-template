const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const user = require("../middlewares/user");

router.post("/signup", controller.registerUser);
router.post("/login", user.validateLoginBody, controller.loginUser);

module.exports = router;
