const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    patientName: {
        type: String,
        required: true
    },
    nationalId: {
        type: Number,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    patientGender: {
        type: String,
        required: true
    },
    patientAddress: {
        type: String,
        required: true
    },
    patientPhone: {
        type: Number,
        required: true
    },
    patientEmail: {
        type: String,
        required: false
    },
    nhifNumber: {
        type: Number,
        required: false
    },
    visitedBefore: {
        type: Boolean,
        required: true,
        default: false,
        Date: {
            type: Date,
            required: true
        }
    }
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
