const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();


router.post("/:id/create_report", expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: "report" });
}));


module.exports = router;
