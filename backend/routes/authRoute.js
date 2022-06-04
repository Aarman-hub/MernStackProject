const express = require('express');
const {check} = require('express-validator');

const {
    userController,
    signinController,
    signupController
} = require('../controllers/authController');

const {
    signinValidator,
    signupValidator
} = require('../validators/userValidator')


const router = express.Router();



router.get('/', userController);

router.post('/signin', signinValidator, signinController);

router.post('/signup', signupValidator, signupController);


module.exports = router;