const {check, validationResult} = require('express-validator');


const signinValidator = [
    check("email","Please Provide a valid Email").isEmail(),
    check("password","Password at least 6 characters").isLength({min:6}),
];
const signupValidator = [
    check("username","Username must be Unique").not().isEmpty(),
    check("email","Please Provide a valid Email").isEmail(),
    check("password","Password at least 6 characters").isLength({min:6}),
];

module.exports = {
    signinValidator,
    signupValidator
}