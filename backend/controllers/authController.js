const User = require('../models/user');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userController = async (req, res) =>{

    const {email} = req.body;

    const user = await User.findOne({email});
}
const signupController = (req, res) =>{

}
const signinController = (req, res) =>{
    
}

module.exports = {
    userController,
    signinController,
    signupController
}