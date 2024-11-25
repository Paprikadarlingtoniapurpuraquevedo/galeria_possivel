const {check, validationResult} = require('express-validator')

exports.validateGenre = [
    check('name').trim().not().isEmpty().
    withMessage('Por favor deve indicar o género literário')
]