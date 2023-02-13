const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
  phoneNumber: {
    type: Number,
    required: [true, "Please add patient's phone number"],
    unique: true,
    minlength: 10,
  },
  name: {
    type: String,
    required: [true, "Please add patient's name"],
    min: 5,
  },
  age: {
    type: Number,
    required: [true, "Please add patient's age"],
  },
  gender: {
    type: Boolean,
    required: [true, "Please add patient's gender"],
    enum: ["Male", "Female"],
    default: "Male",
  },
  registered_date: {
    type: Date,
    required: [true, "Please enter date of registration"],
  },
  treatment: {
    type: String,
  },
});


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
