const express = require('express');
const router = express.Router();


// load controllers
const {
    registerController,
    activationController,
    signinController,
    forgotPasswordController,
    resetPasswordController,
    googleController,
    facebookController
} = require('../controllers/auth.controller.js');

router.post('/register', registerController);
router.post('/activation', activationController);
router.post('/signin', signinController);


// forgot reset password
router.put('/forgotpassword', forgotPasswordController);
router.put('/resetpassword', resetPasswordController);


// Google and Facebook Login
router.post('/googlelogin', googleController);
router.post('/facebooklogin', facebookController);

module.exports = router;