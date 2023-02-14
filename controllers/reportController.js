const User = require('../models/userSchema');
const path = require('path');
const fs = require('fs');

const { userLogin } = require("./userController");
const { json } = require("express");
const expressAsyncHandler = require('express-async-handler');

const saveReports = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.finfById(req.params.id);
        if (user.reports === "") {
            await User.findByIdAndUpdate(req.params.id, {
                reports: req.file.filename
            });
        } else {
            const filePath = path.join(__dirname,
                `../public/uploads/${user.reports}`);
        }
    } catch (error) {
        
    }
});
