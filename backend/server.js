const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');
const userRouter = require('./routes/authRoute');


const app = express();

//Database Connect

connectDB()


//Middleware
app.use(express.json({exteded:false}));

//Router

app.use('/api/v1/user', userRouter);

const port = process.env.PORT || 5000;


app.listen(port, ()=>{
    console.log(`Server is connected port ${port}`);
});