const express = require('express');
const router = express.Router();

// importing controller
const {
  getDoctor,
  loginDoctor,
  registerDoc,
} = require("../controller/doctorController");

// routes
router.route("/").get(getDoctor);
router.route("/register").post(registerDoc);
router.route("/login").post(loginDoctor);



module.exports = router;
