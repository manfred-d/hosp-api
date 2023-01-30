const asyncHandler = require('express-async-handler');
const Patient = require('../models/patientModel');

const newPatient = asyncHandler(async (req, res) => {
    const { patientName, nationalId, patientAge, patientGender, patientPhone, patientEmail, visitedBefore } = req.body;

    //validate input data

    if (!patientName || !nationalId || !patientAge || !patientGender || !patientPhone || !patientEmail || !visitedBefore) {
        res.status(400);
        throw new Error('Please fill all fields');
    }

    try {
        const validateVisit = await Patient.findOne({ nationalId });
        if (validateVisit) {
            //update last visit
            await Patient.findOneAndUpdate(
                { nationalId },
                {
                    $set: {
                        visitedBefore: true,
                        "visitedBefore.Date": Date.now()
                    }
                });
            return res.status(200).json({ message: 'Patient updated successfully' });
        }
        //create new patient
        const patient = await Patient.create({
            patientAge, patientEmail, patientGender, patientName, patientPhone, nationalId, visitedBefore: {Date: new Date()}
        });
        await patient.save();
        res.status(201).json({ message: 'Patient created successfully' });
    } catch (error) {
        return res.status(300).json({ message: "failed to update or create patient", error});
    }
});
