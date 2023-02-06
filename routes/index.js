const express = require("express");
const router = express.Router();
const doctorRoute = require("./Doctor");
const reportRoute = require('./Report');
const patientRoute = require('./Patient');


router.use("/doctor", doctorRoute);
router.use("patient", patientRoute);
router.use("/report", reportRoute);
