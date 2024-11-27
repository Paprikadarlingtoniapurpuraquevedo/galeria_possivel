var mongoose = require('mongoose')
const { permission } = require('process')
var Schema = mongoose.Schema
var genreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    permission: {
        type: String,
        enum: ['admin', 'reader'],
        default: 'reader'
    },
})

module.exports = mongoose.model('Genre', genreSchema)