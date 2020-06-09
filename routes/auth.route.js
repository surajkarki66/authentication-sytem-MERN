const express = require('express');
const router = express.Router();


// load controllers
const {
    registerController,
    activationController,
    signinController
} = require('../controllers/auth.controller.js');

router.post('/register', registerController);
router.post('/activation', activationController);
router.post('/signin', signinController);

module.exports = router;