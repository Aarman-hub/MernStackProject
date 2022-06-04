const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const userRouter = require('./routes/authRoute');


const app = express();

//Database Connect

connectDB()


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(morgan('tiny'))

//Router

app.use('/api/v1/user', userRouter);

const port = process.env.PORT || 8000;


app.listen(port, ()=>{
    console.log(`Server is connected port ${port}`);
});