var mongoose = require('mongoose')
const { permission } = require('process')
var Schema = mongoose.Schema
var genreSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    permission: {},
})

module.exports = mongoose.model('Genre', genreSchema)