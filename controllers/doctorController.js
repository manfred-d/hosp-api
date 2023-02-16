<<<<<<< HEAD
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
=======
const Hospitals = require('../models/hospitalSchema');
const Doctor = require('../models/doctorSchema');
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');

const doctorReview = expressAsyncHandler(async (req, res) => {
  const { comment, userId, ratings, userName, profilePic } = req.body;

  try {
    const reviews = await Doctor.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          reviews: {
            comment,
            userId,
            ratings,
            userName,
            profilePic
          },
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});


const docRegister = expressAsyncHandler(async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const existDoc = await Doctor.findOne({ email: req.body.email });
    if (existDoc) throw new Error("Doctor Already Exists");


    //create new 
    const newDoc = new Doctor({
      name: req.body.name,
      email: req.body.email,
      spec: req.body.spec,
      exp: req.body.exp,
      contact: req.body.contact,
      workingOn: req.body.workingOn,
      graduatedFrom: req.body.graduatedFrom,
      password: req.body.password,
    });
    const doc = await newDoc.save();
    res.status(200).json({
      _id: doc._id,
      name: doc.name,
      email: doc.email,
      spec: doc.spec,
      exp: doc.exp,
      contact: doc.contact,
      workingOn: doc.workingOn,
      graduatedFrom: doc.graduatedFrom,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

});
const docLogin = expressAsyncHandler(async (req, res) => {
  try {
    const doc = await Doctor.findOne({ email: req.body.email });
    if (!doc) {
      res.status(400);
      throw new Error("User not found");
    }
    // compare password
    const validPassword = await bcrypt.compare(req.body.password, doc.password);

    if (!validPassword) {
      res.status(400);
      throw new Error(" Invalid Password or username");
    }

    res.status(200).json({
      _id: doc._id,
      name: doc.name,
      email: doc.email,
      exp: doc.exp,
      contact: doc.contact,
      workingOn: doc.workingOn,
      graduatedFrom: doc.graduatedFrom,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = { doctorReview, docRegister, docLogin }
>>>>>>> d0da25b105b1487db1ae92bcccc7eac237a056b8
