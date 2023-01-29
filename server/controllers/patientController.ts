const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const Patient = require("../models/patientSchema");
const newPatient = asyncHandler(async (req: Request, res: Response) => {
    const { patientName, NationalId, patientAge, patientGender, patientPhone, patientEmail, visitedBefore } = req.body; 
});
