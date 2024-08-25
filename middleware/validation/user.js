const {check, validationResult} = require('express-validator')

exports.validateUserSignUp = [
    check('fullname').trim().not().isEmpty().
    withMessage('Por favor indicar nome.').isString().
    withMessage('Nome inválido.').isLength({min: 6}).
    withMessage('O nome terá pelo menos 6 caracteres.'),
    check('email').normalizeEmail().isEmail().
    withMessage('Não é email.'),
    check('password').trim().not().isEmpty().
    withMessage('Senha não colocada').
    isLength({min: 6}).
    withMessage('A senha terá pelo menos 6 caracteres.'),
    check('confirmpassword').trim().not().isEmpty().custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Senhas não coincidentes, tentar de novo.')
        }
        return true
    })
]

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if(!result.length) return next()

    const error = result[0].msg
    res.json({success: false, message: error})
}

exports.validateUserSignIn = [
    check('email').trim().isEmail().
    withMessage('Preencher com email e senha.'),
    check('password').trim().not().isEmpty().
    withMessage('Preencher com email e senha.')
]