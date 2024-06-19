"use strict"
const express= require('express');
const app = express();
const router = require('./src/routes/user-routes.js')
const path= require('path')
app.use(express.static(path.join(__dirname,'public')));
const dotenv= require("dotenv")
dotenv.config()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const session= require('express-session')
const logRequest= require('./src/middlewares/logmiddleware.js')
const xss=require('xss');
const helmet= require('helmet');
const cors = require("cors");
const rateLimit = require("express-rate-limit");

app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 50,
    })
);



//CORS. To do

app.use(helmet());

app.use(logRequest);

const DURATION= 5 * 1000;
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(session({
    secret:'mySecretKey',
    saveUninitialized: true,
    resave:false,
    cookie:{
        maxAge: DURATION
    },
}))

app.use((req,res,next)=>{
    console.log(req.session)
    next()
})

app.use('/user',router);

const PORT= process.env.PORT
app.listen(PORT, ()=>{console.log(`Listening on PORT ${PORT}`)})

