const {check, validationResult} = require('express-validator')

exports.validateBook = [
    check('author').trim().not().isEmpty().
    withMessage('Por favor indicar o nome do autor'),
    check('title').trim().not().isEmpty().
    withMessage('Por favor indique o título')
]