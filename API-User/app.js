"use strict"
const express= require('express');
const app = express();
const router = require('./src/routes/user-routes.js')
const path= require('path')
app.use(express.static(path.join(__dirname,'public')));
const dotenv= require("dotenv")
dotenv.config()
const session= require('express-session')
const logRequest= require('./src/middlewares/logmiddleware.js')

app.use(logRequest);

const DURATION= 10 * 1000;
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

