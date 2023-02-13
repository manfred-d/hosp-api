const User = require("../models/User");
const Patient = require("../models/patient");
const expressAsyncHandler = require('express-async-handler');
const ErrorResponse = require("../utils/errorResponse");

exports.register = expressAsyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
    const token = user.generateToken();

    res.status(200).json({
        succes: true,
        token
    });
});

exports.login = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next( new ErrorResponse( "Fields cannot be blank", 400))
    }
    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorResponse("User doesn't Exist", 401));
    }
    const findmatch = await user.matchPassword(password);

    if (!findmatch) {
        return next(new ErrorResponse(" invalid credentials", 401));
    }

});

const patientRegister = expressAsyncHandler(async (req, res, next) => {
    let patient = await Patient.findOne({
        phoneNo: req.body.phoneNo
    });



    if (!patient) {
        const userPrompt = prompt("Patient Not found, Do you want to create one? (yes/no)");
        if (userPrompt.toLowerCase() === "No") {
            throw new Error("Patient Not found, Please Create");
        } else if (userPrompt.toLowerCase === "Yes") {
            patient =  await Patient.create(req.body)
        } else {
            throw new Error("Invalid Response")
        }
    }
});
