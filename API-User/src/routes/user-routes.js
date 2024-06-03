const express= require('express');
const router= express.Router();
const UserController = require('../controllers/user-controller.js')
const validateUser = require('../middlewares/validateUser.js')
const path= require('path')
const app= express()
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(express.static(path.join(__dirname, 'public')));


router.get('/', UserController.getAll);
router.get('/id/:id', UserController.getById)
router.get('/register', UserController.showFormSignIn )

router.post('/register', validateUser, UserController.registerUser)
router.delete('/id/:id', UserController.deleteUser)
router.patch('/id/:id', UserController.updateUser)



module.exports = router;