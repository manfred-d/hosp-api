const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();


router.get("/:status", expressAsyncHandler(async (req, res) => {
    res.status(200).json({message: " get all report"})
}));


module.exports = router;
