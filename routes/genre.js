const express = require('express')

const genreRouter = express.Router()
const {createGenre, deleteGenreById, getGenres, getGenreById, updateGenreById} = require('../controllers/genre')
const {genreValidation, validateGenre} = require('../middleware/validation/genre')
const { validationResult } = require('express-validator')

genreRouter.delete('/genre/:id', deleteGenreById)
genreRouter.get('/genres', getGenres)
genreRouter.get('/genre/:id', getGenreById)
genreRouter.patch('/genre/:id', validateGenre, genreValidation, updateGenreById)
genreRouter.post('/create-genre', validateGenre, genreValidation, createGenre)

module.exports = genreRouter