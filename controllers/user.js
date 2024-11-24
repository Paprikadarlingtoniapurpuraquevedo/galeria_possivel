const bcrypt = require('bcrypt')
const salt = require('salt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
exports.createUser = async (req, res) => {
const {fullname, email, password} = req.body
const isNewUser = await User.isThisEmailInUse(email)
if(!isNewUser)
    return res.json({
        success: false,
        message: 'Email em uso, tentar outro'
    })
 const user = await User({
    fullname,
    email,
    password
})
await user.save()
res.json(user)
}

exports.userSignIn = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(!user) return res.json({
        success: false,
        message: 'Utilizador inexistente'
    })
    
    const isMatch = await user.comparePassword(password)
    
    if(!isMatch) return res.json({
        success: false,
        message: 'Email e senha não combinam.'
    })

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.json({success: true, user, token})
}

exports.getUsers = function(req, res, next){
    User.find({}).then(function(data) {
        res.status(200).json({
            status: "success",
            data: data
        })
    }).catch(err=>{
        res.status(404).json({
            status: "fail",
            message: "Falhou" + err
        })
    })
}

exports.signedUser = function(req, res, next){
    let id = req.params.id
    User.find({_id:id}).then(function(data) {
        res.status(200).json({
            status: "success",
            data: data
        })
    }).catch(err=>{
        res.status(404).json({
            status: "fail",
            message: "Falhou" + err
        })
    })
}

exports.updateUserById = function(req, res, next){
    let id = req.params.id
    User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}).then(function(data) {
        res.status(200).json({
            status: "success",
            data: data
        })
    }).catch(err=>{
        res.status(404).json({
            status: "fail",
            message: "Falhou" + err
        })
    })
}

exports.deleteUserById = function(req, res, next){
    let id = req.params.id
    User.findByIdAndDelete(id).then(function(data) {
        res.status(200).json({
            status: "success",
            data: null
        })
    }).catch(err=>{
        res.status(404).json({
            status: "fail",
            message: "Falhou" + err
        })
    })
}