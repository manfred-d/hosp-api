const Medic = require('../models/medicSchema');
const expressAsyncHandler = require('express-async-handler');


const addMedicine = expressAsyncHandler(async (req, res) => {
    const { name, weight, cost, field, otherName, details } = req.body;
    const image = req.file.filename;
    const by = req.user._id; //*
    try {
        if (!name || !weight || !cost || !field || !details) {
            res.status(400);
            throw new Error("Please fill all fields");
        }
        const medicine = await new Medic({ name, weight, cost, field, otherName, details, image, by }).save();
        res.status(200).json({
            success: true,
            message: "Medicine added successfully",
            medicine
        });
    } catch (error) {
        
    }
});

const getAllMedicines = expressAsyncHandler(async (req, res) => {
    try {
        const Medicines = await Medic.find({});
        res.status(200).json({
            success: true,
            // message: "Medicines fetched successfully",
            Medicines
        });
        !Medicines && res.status(400).json({
            success: true,
            message: "No medicines found"
        });
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

const getMedicineById = expressAsyncHandler(async (req, res) => {
    try {
        const medicine = await Medic.findById(req.params.id);
        res.status(200).json({
            success: true,
            // message: "Medicine fetched successfully",
            medicine
        });
        !medicine && res.status(400).json({
            success: true,
            message: "No medicine found"
        });
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
}
);


module.exports = {
    addMedicine,
    getAllMedicines,
    getMedicineById
};
