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
    GenreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    },
    isRequestable: {
        type: String,
        required: true,
        enum: [],
        default: ''
    },
    permission: {
        type: String,
        enum: [],
        default: ''
    },
})

module.exports = mongoose.model('Book', bookSchema)