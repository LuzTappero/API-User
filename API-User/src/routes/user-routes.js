const express= require('express');
const router= express.Router();
const UserController = require('../controllers/user-controller.js')
const app= express()
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

router.get('/', UserController.getAll);
router.get('/id/:id', UserController.getById)

router.post('/create', UserController.createUser)
router.delete('/id/:id', UserController.deleteUser)
router.patch('/id/:id', UserController.updateUser)



module.exports = router;