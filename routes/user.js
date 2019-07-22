// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/user');
const inputValidator = require('../validation/user');

// Get Express Router Function..
const router = express.Router();

router.post('/registration', inputValidator.checkUserRegInput, controller.userRegistration); // http://localhost:3000/api/user/registration
router.get('/registration-list', controller.allUserLists); // http://localhost:3000/api/user/registration-list
router.get('/user-details/:regId', controller.getRegistrationDetails); // http://localhost:3000/api/user/user-details/:regId

// Export All router..
module.exports = router;