const express = require('express');
const router = express.Router();

const { doctorReview, docRegister, docLogin } = require("../controllers/doctorController");

router.put("/:id/doctorReview", doctorReview);
router.post("/doc_login", docLogin);
router.post("/doc_register", docRegister);


module.exports = router;
