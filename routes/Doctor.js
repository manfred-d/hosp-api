const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();




router.post("/register1", expressAsyncHandler(async (req, res) => {
    res.status(200).json({ "message": "This is register route for doctor" });
}));


router.post("/login", expressAsyncHandler(async (req, res) => {
    res.status(200).json({message: " login route"})
}));



router.post("/register2", expressAsyncHandler(async (req, req) => {
    res.status(200).json({ message: " registration for the patient" });
}));


router.exports = router;
