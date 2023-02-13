const User = require("../models/User");
const Patient = require("../models/patient");
const expressAsyncHandler = require('express-async-handler');
const ErrorResponse = require("../utils/errorResponse");

exports.register = expressAsyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
    
});
