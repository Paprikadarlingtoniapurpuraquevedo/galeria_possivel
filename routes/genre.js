const express = require('express')

const genreRouter = express.Router()
const {createGenre, deleteGenreById, getGenres, getGenreById, updateGenreById} = require('../controllers/genre')
const {genreValidation, validateGenre} = require('../middleware/validation/genre')
const {isAuth, isAdmin} = require('../middleware/isauth')
const { validationResult } = require('express-validator')

genreRouter.delete('/genre/:id', isAuth, isAdmin, deleteGenreById)
genreRouter.get('/genres', getGenres)
genreRouter.get('/genre/:id', getGenreById)
genreRouter.patch('/genre/:id', isAuth, isAdmin, validateGenre, genreValidation, updateGenreById)
genreRouter.post('/create-genre', isAuth, isAdmin, validateGenre, genreValidation, createGenre)

module.exports = genreRouter