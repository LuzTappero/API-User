const express= require('express');
const router= express.Router();
const UserController = require('../controllers/user-controller.js')
const validateUser = require('../middlewares/validateUser.js')


router.get('/', UserController.getAll);
router.get('/id/:id', UserController.getById)
router.get('/register', UserController.showFormSignIn )

router.post('/register', validateUser, UserController.registerUser)
router.delete('/delete/id/:id', UserController.deleteUser)
router.patch('/update/id/:id', UserController.updateUser)



module.exports = router;