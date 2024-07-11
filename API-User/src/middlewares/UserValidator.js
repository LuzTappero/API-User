const { body, validationResult } = require('express-validator');

const registerUserValidator = 
    [
    body('username').notEmpty().isLength({ min: 3 }).isLength({max: 15}).withMessage('Username must be at least 3 characters long  and max 15'),
    body('email').isEmail().withMessage('Must be a valid e-mail'),
    body('password')
    .isString().withMessage('Must have strings')
    .isLength({min:8}).isLength({max: 15}).withMessage('The password must have at least 8 characters and max 15')
    .matches(/\d/).withMessage('Password must contain at least a number')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least a letter'),
    (req,res,next)=>{
        const errors= validationResult(req).formatWith(({msg})=>{
            return {
                msg
            };
        });
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
]


module.exports= {registerUserValidator};