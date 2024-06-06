const express= require('express');
const router= express.Router();
const UserController = require('../controllers/user-controller.js')
const validateUser = require('../middlewares/validateUser.js')

router.get('/', UserController.getAll);
router.get('/id/:id', UserController.getById)
router.get('/register', UserController.showFormSignIn )
router.get('/login', UserController.showFormLogin)
router.get('/profile', UserController.profile)
router.get('/Home', UserController.home)
router.get('/logout', UserController.logOut)


router.post('/register', validateUser, UserController.registerUser)
router.post('/login', UserController.logInUser)
router.delete('/delete/id/:id', UserController.deleteUser)
router.patch('/update/id/:id', UserController.updateUser)



module.exports = router;