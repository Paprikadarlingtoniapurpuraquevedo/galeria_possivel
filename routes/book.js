const express = require('express')

const bookRouter = express.Router()
const {createBook, deleteBookById, getBooks, getBookById, updateBookById} = require('../controllers/book')
const {validateBook} = require('../middleware/validation/book')
const { validationResult } = require('express-validator')

bookRouter.delete('/book/:id', deleteBookById)
bookRouter.get('/books', getBooks)
bookRouter.get('/book/:id', getBookById)
bookRouter.patch('/book/:id', updateBookById)
bookRouter.post('/create-book', createBook, validateBook, validationResult)

module.exports = bookRouter
