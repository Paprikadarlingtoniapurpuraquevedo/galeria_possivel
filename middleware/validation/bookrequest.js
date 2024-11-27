const {check, validationResult} = require('express-validator')

exports.validateBookRequest = [
    check('readerId').trim().not().isEmpty().
    withMessage('Indicar o nome do leitor'),
    check('bookId').trim().not().isEmpty().
    withMessage('Indicar o título do livro'),
    check('expectedReturnDate').trim().not().isEmpty().
    withMessage('Atribuir prazo para a devolução'),
    check('genreId').trim().not().isEmpty().
    withMessage('Indicar o género literário'),
    check('status').trim().not().isEmpty().
    withMessage('Indicar o estado')
]