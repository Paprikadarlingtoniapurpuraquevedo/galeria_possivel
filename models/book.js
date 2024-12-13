var mongoose = require('mongoose')
const { permission } = require('process')
var Schema = mongoose.Schema
var bookSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    publisher: {
        type: String
    },
    year: {
        type: Number
    },
    description: {
        type: String,
        minlength: 2,
        maxlength: 1000
    },
    genreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    },
    isRequestable: {
        type: String,
        enum: ['Sim', 'Não'],
        default: 'Sim'
    },
    permission: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
})

module.exports = mongoose.model('Book', bookSchema)