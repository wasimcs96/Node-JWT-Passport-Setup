const express = require('express')
const router = express.Router();
const {authRoutes} = require('./User/auth');
const {userRoutes} = require('./User/user');

router.use('/', authRoutes)
router.use('/user/', userRoutes);

module.exports = router