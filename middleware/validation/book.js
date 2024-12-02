const {check, validationResult} = require('express-validator')

exports.validateBook = [
    check('author').trim().not().isEmpty().
    withMessage('Por favor indicar o nome do autor'),
    check('title').trim().not().isEmpty().
    withMessage('Por favor indique o título')
]

exports.bookValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if(!result.length) return next()

    const error = result[0].msg
    res.json({success: false, message: error})
}