const { Router } = require('express');

const router = Router();

//Individual Routes
const authRoutes = require('./auth');
const adminRoutes = require('./admin');
const userRoutes = require('./user');

//Middlewares
const auth = require('../middlewares/auth');


router.use('/', authRoutes);
router.use('/admins', auth.check_authorized_admin, adminRoutes);
router.use('/users', auth.check_authorized_user, userRoutes);


//Base Route
router.get('/', (req, res) => res.sendStatus(200));

//Page Not Found
router.all('*', (req, res) => res.sendStatus(404));

module.exports = router;