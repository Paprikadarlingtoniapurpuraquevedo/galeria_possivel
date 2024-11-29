const {check, validationResult} = require('express-validator')

exports.validateGenre = [
    check('name').trim().not().isEmpty().
    withMessage('Por favor deve indicar o género literário')
]

exports.genreValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if(!result.length) return next()

    const error = result[0].msg
    res.json({success: false, message: error})
}