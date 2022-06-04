const User = require('../models/user');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');


const userController = async (req, res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user)
    } catch (error) {
        console.error(error.msg)
    }
    
}
const signupController = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const {username, email, password} = req.body;

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({errors: [{msg:"Email already taken!"}]})
        }

        user = new User({
            username,
            email,
            password
        });

        const salt = await bycrypt.genSalt(10);
        user.password = await bycrypt.hash(password, salt);

        user.save();

        const payload = {
            user:{
                id:user._id,
                username:user.username,
                email:user.user.email
            }
        }

        const JWTSECRET = process.env.JWTSECRET;

        jwt.sign(payload, JWTSECRET, {expiresIn:3600*2}, (err, token)=>{
            if(err) throw err;
            res.json({token})
        });


    } catch (error) {
        res.status(500).send("Internal Server Error.");
    }
}
const signinController = async (req, res) =>{

    const jwtSecret = process.env.JWTSECRET;

    try {
        const {email, password} = req.body;

        if(!email || !password){
            res.status(400).send("Email and Password are required!");
        }
        const user = await User.findOne({email});

        if(user && (await bycrypt.compare(password, user.password))){
            const token = jwt.sign({
                id:user._id,
                email,
                username
            },jwtSecret, {expiresIn:"2h"} )

            user.token = token;

            return res.status(200).json(user)
        }

        res.status(400).send("Invalid Credentail");

    } catch (error) {
        res.status(500).send("Something Wrong!")
    }
    
}

module.exports = {
    userController,
    signinController,
    signupController
}