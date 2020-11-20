const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/register', authController.register_a_user);
router.post('/login', authController.login_a_user);

module.exports = router;