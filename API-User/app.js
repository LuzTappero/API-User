"use strict"
const express= require('express');
const app = express();
const router = require('./src/routes/user-routes.js')
const dotenv= require("dotenv")
const path= require('path')
const morgan= require('morgan')
const session= require('express-session')

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.use(morgan("dev"))

const helmet= require('helmet');
app.use(helmet());

const rateLimit = require("express-rate-limit");
const TIMES = parseInt(process.env.TIMES)
const MAX = parseInt(process.env.MAX)
app.use(
    rateLimit({
        windowMs: TIMES,
        max: MAX,
    })
);

const DURATION= parseInt(process.env.DURATION)
const SECRET_KEY= process.env.SECRET_KEY
app.use(session({
    secret:SECRET_KEY,
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

// const cors = require("cors");
// app.use(cors())
//Configurar cors para los dominios que quiero que tengan acceso


app.use('/user',router);

const PORT= process.env.PORT
app.listen(PORT, ()=>{console.log(`Listening on PORT ${PORT}`)})
