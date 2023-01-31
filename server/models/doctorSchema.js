const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    doctorName: {
        type: String,
        required: true,
        default: "Dr."
    },
    nationalId: {
        type: String,
        required: true,
        unique: true,
        default: "12345678",
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        default: "password",
    },
    phoneNumber: {
        type: Number,
        required: true,
        default: "+254(0)700000000",
    },
    department: {
        type: String,
        required: true,
        default: "General",
    },
    discipline: {
        type: String,
        required: true,
        default: "General",
    }
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
