const express= require('express');
const router= express.Router();
const UserController = require('../controllers/user-controller.js')
const {registerUserValidator, loginUserValidator }= require('../middlewares/UserValidator.js')

router.get('/', UserController.getAll);
router.get('/id/:id', UserController.getById)
router.get('/register', UserController.showFormSignIn )
router.get('/login', UserController.showFormLogin)
router.get('/profiles', UserController.profiles)
router.get('/Home', UserController.home)
router.get('/logout', UserController.logOut)


router.post('/register', registerUserValidator, UserController.registerUser)
router.post('/login',loginUserValidator, UserController.logInUser)

router.delete('/id/:id', UserController.deleteUser)
router.patch('/id/:id', UserController.updateUser)



module.exports = router;