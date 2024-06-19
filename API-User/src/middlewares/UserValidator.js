const { body, validationResult } = require('express-validator');

const registerUserValidator = [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Must be a valid e-mail'),
    body('password').isLength({min:8}).withMessage('The password must have at least 8 characters').matches(/\d/)
    .withMessage('Password must contain at leart a number'),
    (req,res,next)=>{
        const errors= validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
]


const loginUserValidator=[
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('password').isLength({min:8}).withMessage('The password must have at least 8 characters'),
    (req,res,next)=>{
        const errors= validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
]
module.exports= {registerUserValidator, loginUserValidator};