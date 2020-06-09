const express = require('express');
const router = express.Router();


// load controllers
const {
    registerController,
    activationController,
    signinController,
    forgotPasswordController,
    resetPasswordController
} = require('../controllers/auth.controller.js');

router.post('/register', registerController);
router.post('/activation', activationController);
router.post('/signin', signinController);


// forgot reset password
router.put('/forgotpassword', forgotPasswordController);
router.put('/resetpassword', resetPasswordController);

module.exports = router;