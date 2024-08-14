"use strict"
import express from 'express'
const app = express();
import userRoutes from './src/routes/userRoutes.js'
import productRoutes from './src/routes/productRoutes.js';
import errorHandler from './src/middlewares/errorHandler.js';
import dotenv from 'dotenv'
import morgan from 'morgan';
import cors from 'cors'

const corsOptions ={
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}
app.use(cors(corsOptions))

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"))


import helmet from 'helmet';
app.use(helmet());

import rateLimit from 'express-rate-limit';
const TIMES = parseInt(process.env.TIMES)
const MAX = parseInt(process.env.MAX)
app.use(
    rateLimit({
        windowMs: TIMES,
        max: MAX,
    })
);

// const DURATION= parseInt(process.env.DURATION)
// const SECRET_KEY= process.env.SECRET_KEY


// app.use(session({
    
//     secret:SECRET_KEY,
//     saveUninitialized: true,
//     resave:false,
//     cookie:{
//         secure: false,
//         httpOnly: true,
//         maxAge: DURATION
//     },
// }))

app.use((req,res,next)=>{
    console.log(req.session)
    next()
})


app.use('/user', userRoutes);
app.use('/products', productRoutes)

app.use(errorHandler)

const PORT= process.env.PORT
app.listen(PORT, ()=>{console.log(`Listening on PORT ${PORT}`)})


