const { body, validationResult } = require('express-validator');

const validateNewUser = [
    body('email').isEmail().withMessage('It must be an e-mail'),
    body('password').isLength({min:8}).withMessage('The password must have at least 8 characters'),

    (req,res,next)=>{
        const errors= validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
]
module.exports= validateNewUser;