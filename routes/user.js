const express = require('express')

const router = express.Router()
const {createUser, deleteUserById, getUsers, updateUserById, userSignIn, signedUser} = require('../controllers/user')
const {validateUserSignUp, userValidation, validateUserSignIn} = require('../middleware/validation/user')
const {isAuth, isAdmin} = require('../middleware/isauth')
const { validationResult } = require('express-validator')

router.delete('/user/:id', isAuth, isAdmin, deleteUserById)
router.get('/users', isAuth, isAdmin, getUsers)
router.get('/user/:id', isAuth, isAdmin, signedUser)
router.patch('/user/:id',  isAuth, isAdmin, validateUserSignUp, userValidation, updateUserById)
router.post('/create-user', validateUserSignUp, userValidation, createUser)
router.post('/login', validateUserSignIn, userValidation, userSignIn)
router.post('/create-post', isAuth, (req, res) => {
    res.send('Rota secreta, bu!')
})

module.exports = router