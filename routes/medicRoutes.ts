const { getAllMedicine, addMedicine, individualMedicine } = require('../controllers/medicController');
router.post("/newmedicine", addMedicine);
router.get('/allmedicine', getAllMedicine);
router.get('/:id', individualMedicine);


module.exports = router;
