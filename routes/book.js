const express = require('express')

const bookRouter = express.Router()
const {createBook, deleteBookById, getBooks, getBookById, updateBookById} = require('../controllers/book')
const {bookValidation, validateBook} = require('../middleware/validation/book')
const {isAuth, isAdmin} = require('../middleware/isauth')
const { validationResult } = require('express-validator')

bookRouter.delete('/book/:id', isAuth, isAdmin, deleteBookById)
bookRouter.get('/books', getBooks)
bookRouter.get('/book/:id', getBookById)
bookRouter.patch('/book/:id', isAuth, isAdmin, validateBook, bookValidation, updateBookById)
bookRouter.post('/create-book', isAuth, isAdmin, validateBook, bookValidation, createBook)

module.exports = bookRouter
