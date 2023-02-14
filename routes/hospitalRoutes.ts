const {
    registerHospital,
    loginHospital,
    individualHospital,
    updateHospital,
    addService,
    addBeds,
    addContacts,
    addDoctors,
    addVacancy,
    bedTypes,
    allDoctors,
    hospitalDetails,
    hospitalReview,
    allHospitalEvents,
} = require('../controllers/hospitalController');

router.post('/register', registerHospital);
router.post('/login', loginHospital);
router.get('/:id', individualHospital);
router.get("/allHospital", hospitalDetails);
router.put("/:id/update", updateHospital);
router.post("/:id/services/addService", addService);
router.post("/:id/beds/addBeds", addBeds);
router.post("/:id/contacts/addContacts", addContacts);
router.post("/:id/doctors/addDoctors", addDoctors);
router.post("/:id/vacancy/addVacancy", addVacancy);
router.get("/:id/bedTypes", bedTypes);
router.get("/:id/allDoctors", allDoctors);
router.post("/:id/hospitalReview", hospitalReview);
router.get("/:id/allHospitalEvents", allHospitalEvents);


module.exports = router;
