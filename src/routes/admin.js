const { Router } = require('express');
const adminController = require('../controllers/adminController');

const router = Router();

router.post('/vendors/add', adminController.add_a_vendor);
router.get('/vendors', adminController.get_all_vendors);
router.post('/offers/add', adminController.add_an_offer);
router.post('/offers/:id/update', adminController.update_an_offer);
router.get('/offers', adminController.get_all_offers);
router.get('/complaints', adminController.receive_all_customer_reports);

module.exports = router;