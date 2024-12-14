var mongoose = require('mongoose')
const { permission } = require('process')
var Schema = mongoose.Schema
var genreSchema = new Schema({
    genre: {
        type: String,
        required: true
    },
    permission: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
})

module.exports = mongoose.model('Genre', genreSchema)