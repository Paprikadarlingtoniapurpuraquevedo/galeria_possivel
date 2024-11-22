const express = require('express')

const router = express.Router()
const {createUser, getUsers, userSignIn, signedUser} = require('../controllers/user')
const {validateUserSignUp, userValidation, validateUserSignIn} = require('../middleware/validation/user')
const {isAuth} = require('../middleware/isauth')
const { validationResult } = require('express-validator')

router.get('/users', getUsers)
router.get('/:id', signedUser)
router.post('/create-user', validateUserSignUp, userValidation, createUser)
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn)
router.post('/create-post', isAuth, (req, res) => {
    res.send('Rota secreta, bu!')
})

module.exports = router