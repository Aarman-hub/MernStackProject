const express = require('express');

const {} = require('../controllers/authController');

const router = express.Router();



router.get('/', (req, res)=>{
    res.send("Hello from User Router");
});

router.post('/signin', (req, res)=>{
    res.send("Hello from User Router");
});

router.post('/signup', (req, res)=>{
    res.send("Hello from User Router");
});


module.exports = router;