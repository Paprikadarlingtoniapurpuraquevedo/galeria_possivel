var mongoose = require('mongoose')
const { permission } = require('process')
var Schema = mongoose.Schema
var bookSchema = new Schema({
    author: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
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
    GenreId: {},
    isRequestable: {
        type: String,
        require: true
    },
    permission: {},
})

module.exports = mongoose.model('Book', bookSchema)