const expressAsyncHandler = require("express-async-handler");

const Doctor = require("../models/Doctor");

// get doctors information
// @route GET api/doctor
const getDoctor = expressAsyncHandler(async (req, res) => {
  // const { employment_id, name, position, specialty } = req.bodyb
  res.json({ message: "its working" });
});

// login doctors information
// @route POST api/doctor/login
const loginDoctor = expressAsyncHandler(async (req, res) => {
  // const { employment_id, name, position, specialty } = req.bodyb
  res.status(200).json({ message: " login route" });
});

// @desc create doctor's details
// @route api/doctor/create
const registerDoc = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: " create route" });
});

module.exports = { getDoctor, loginDoctor, registerDoc };
