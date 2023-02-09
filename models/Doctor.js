const mongoose = require("mongoose");
const DoctorSchema = new mongoose.Schema(
  {
    employement_id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please add your name"],
      min: 5,
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

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
