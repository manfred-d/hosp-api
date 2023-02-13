const expressAsyncHandler = require("express-async-handler");

const Doctor = require("../models/Doctor");

// get doctors information
// @route GET api/doctor
const getDoctor = expressAsyncHandler(async (req, res) => {
  // const { employment_id, name, position, specialty }

  const doctors = await Doctor.find(req.body);

  res.json(doctors);
});

// create doctors information
// @route POST api/doctor/create
const createDoctor = expressAsyncHandler(async (req, res) => {
  const { employment_id, name, email, position, specialty } = req.body;
  if (!employment_id || !name || !email || !position || !specialty) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  // check is doctor exits
  const doctorExist = await Doctor.findOne({ email });
  if (doctorExist) {
    res.status(400);
    throw new Error("Doctor already exist with same email");
  }
  // create doctor
  const doctor = await Doctor.create({
    employment_id,
    name,
    email,
    position,
    specialty,
  });

  if (doctor) {
    res.status(200).json({
      _id: doctor.id,
      employment_id: doctor.employment_id,
      name: doctor.name,
      email: doctor.email,
      position: doctor.position,
      specialty: doctor.specialty,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc update doctor's details
// @route api/doctor/update
const updateDoc = expressAsyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(400);
    throw new Error("Doctor not found");
  }
  // update
  const updateDoc = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateDoc);
});

// @desc delete doctor record
// @route api/doctor/delete
const deleteDoc = expressAsyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(400);
    throw new Error("Doctor not found");
  }

  await doctor.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getDoctor, createDoctor, updateDoc, deleteDoc };
