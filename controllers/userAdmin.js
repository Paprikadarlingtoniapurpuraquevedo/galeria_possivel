const jwt = require('jsonwebtoken')

const UserAdmin = require('../models/user')
exports.createUserAdmin = async (req, res) => {
const {fullname, birthdate, email, password, role} = req.body
const isNewUser = await UserAdmin.isThisEmailInUse(email)
if(!isNewUser)
    return res.json({
        success: false,
        message: 'Email em uso, tentar outro'
    })
 const user = await UserAdmin({
    fullname,
    birthdate,
    email,
    password,
    role
})
await user.save()
res.json(user)
}