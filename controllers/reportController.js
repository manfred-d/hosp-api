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
        fs.unlinkSync(filePath);
        await User.findByIdAndUpdate(req.params.id, {
            reports: req.file.filename
        });
        res.status(200).json({
            success: true,
            message: "Report updated successfully"
        });
    } catch (error) {
        res.status(200);
        throw new Error(error);
    }
});


const downloadReports = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const filePath = path.join(__dirname,
            `../public/uploads/${user.reports}`);
        res.download(filePath);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

module.exports = {
    saveReports,
    downloadReports
}
