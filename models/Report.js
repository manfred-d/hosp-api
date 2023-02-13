const { default: mongoose } = require("mongoose");

const reportSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Positive", "Negative"],
    required: true,
  },
  patient_id: {
    ref: "patient",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});


const Report = mongoose.Schema.model("report", reportSchema);
module.exports = Report;
