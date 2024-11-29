const express = require('express')

const bookrequestRouter = express.Router()
const {createBookRequest, deleteBookRequestById, getBookRequests, getBookRequestById, updateBookRequestById} = require('../controllers/bookrequest')
const {bookrequestValidation, validateBookRequest} = require('../middleware/validation/bookrequest')
const { validationResult } = require('express-validator')

bookrequestRouter.delete('/bookrequest/:id', deleteBookRequestById)
bookrequestRouter.get('/bookrequests', getBookRequests)
bookrequestRouter.get('/bookrequest/:id', getBookRequestById)
bookrequestRouter.patch('/bookrequest/:id', validateBookRequest, bookrequestValidation, updateBookRequestById)
bookrequestRouter.post('/create-bookrequest',  validateBookRequest, bookrequestValidation, createBookRequest)

module.exports = bookrequestRouter