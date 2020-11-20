const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.get('/vendors', userController.get_all_vendors);
router.get('/offers', userController.get_all_offers);
router.post('/complaints/register', userController.register_a_complaint);

module.exports = router;