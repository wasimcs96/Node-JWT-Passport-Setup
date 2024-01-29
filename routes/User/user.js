const express = require('express');
const userRoutes = express.Router();
const {requireAuth} = require('../../config/passportJwt');
const {requireAuthorization} = require('../../middleware/checkAuthorization');
const {User, Admin, SuperAdmin} = require('../../config/roles');
const userController = require('../../controllers/user/User');

userRoutes.use(requireAuth, requireAuthorization([User]));
userRoutes.post('/', userController.profile)

module.exports = {userRoutes}