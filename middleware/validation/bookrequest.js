const {check, validationResult} = require('express-validator')

exports.validateBookRequest = [
    check('expectedReturnDate').trim().not().isEmpty().
    withMessage('Atribuir prazo para a devolução')
]