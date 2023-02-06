const express = require('express');
const router = express.Router();
const expressAsyncHandler = require("express-async-handler")


router.post("/register1", async(req, res)=>{
    res.status(200).json({message: "hello"})
});


router.post("/login", expressAsyncHandler(async (req, res) => {
    res.status(200).json({message: " login route"})
}));



router.post("/register2", expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: " registration for the patient" });
}));


module.exports = router;
