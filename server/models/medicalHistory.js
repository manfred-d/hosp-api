
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicalHistorySchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    history: [{
        date: Date,
        notes: String,
        diagnosis: {
            code: String,
            description: String
        },
        medications: [{
            name: String,
            dosage: String,
            frequency: String,
            default: null
        }],
        procedures: [{
            name: String,
            date: Date,
            default: null
        }],
        allergies: [{
            name: String,
            reaction: String,
            default: null
        }],
        vitals: {
            weight: Number,
            height: Number,
            temperature: Number,
            bloodPressure: {
                systolic: Number,
                diastolic: Number
            },
            pulse: Number,
            respiratoryRate: Number,
            oxygenSaturation: Number,
        },
    }]
});

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);
