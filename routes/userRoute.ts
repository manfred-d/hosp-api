const { userRegister, userLogin, individualUser } = require('../controllers/userController');

router.post("/register", userRegister);
router.post("/login", userLogin);


module.exports = router;
