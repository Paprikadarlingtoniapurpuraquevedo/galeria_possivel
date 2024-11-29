const {check, validationResult} = require('express-validator')

exports.validateBookRequest = [
    check('expectedReturnDate').trim().not().isEmpty().
    withMessage('Atribuir prazo para a devolução')
]

exports.bookrequestValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if(!result.length) return next()

    const error = result[0].msg
    res.json({success: false, message: error})
}