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
        unique: true
    }
});
