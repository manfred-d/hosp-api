const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.authenticate = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization;
    }
    if (!token) {
        return ErrorResponse("Acces error, Unauthorized Request")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = User.findById(decoded.id);
        req.user = user._id.toString();

        next();
    } catch (error) {
        return next(
            new ErrorResponse("Bad request")

        )
    }

});
