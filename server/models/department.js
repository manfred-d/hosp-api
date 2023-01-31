const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const departmentSchema = new Schema({
    departmentName: {
        type: String,
        required: true,
        default: "General",
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    departmentDescription: {
        type: String,
        required: true,
        default: "General",
    },
    departmentDiscipline: {
        type: String,
        required: true,
        default: "General",
    },
    departmentHead: {
        type: String,
        required: true,
        default: "Dr. John Doe",
    },
});

const department = mongoose.model("department", departmentSchema);
module.exports = department;
