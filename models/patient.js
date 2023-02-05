const mongoose = require('mongoose');
const patientSchema = new mongooseSchema({
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
    }
});


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
