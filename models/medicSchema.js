const mongoose = require('mongoose');
const medicSchema = mongoose.Schema({
    name: { type: String, required: true },
    otherName: { type: String, default: "" },
    weight: { type: Number, required: true },
    cost: { type: Number, required: true },
    field: { type: String, required: true },
    image: { type: String },
    details: { type: String, required: true },
    by: { type: String}
});

const Medic = mongoose.model("medic", medicSchema);
module.exports = Medic
