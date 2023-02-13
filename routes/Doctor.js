const express = require('express');
const router = express.Router();

// importing controller
const {
  getDoctor,
  createDoctor,
  updateDoc,
  deleteDoc,
} = require("../controllers/doctorController");

// routes
router.route("/").get(getDoctor);
router.route("/update/:id").put(updateDoc);
router.route("/create").post(createDoctor);
router.route("/delete/:id").delete(deleteDoc);



module.exports = router;
