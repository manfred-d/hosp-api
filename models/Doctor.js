const mongoose = require("mongoose");
const DoctorSchema = new mongoose.Schema(
  {
    employment_id: {
      type: Number,
      required: [true, "Please add reg number"],
    },
    name: {
      type: String,
      required: [true, "Please add your name"],
      min: 5,
    },
    email: {
      type: String,
      required: [true, "Please add enmail"],
      unique: true,
    },
    position: {
      type: String,
      required: [true, "Please add your occupation"],
    },
    specialty: {
      type: String,
      required: [true, "Please add area of specialty"],
    },
  },
  { timestamps: true }
);

 module.exports = mongoose.model("Doctor", DoctorSchema);

