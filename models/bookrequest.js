var mongoose = require('mongoose')
const { permission } = require('process')
var Schema = mongoose.Schema
var bookrequestSchema = new Schema({
    readerId: {},
    bookId: {},
    requestDate: {
        type: Date
    },
    expectedReturnDate: {
        type: Date
    },
    returnDate: {
        type: Date
    },
    GenreId: {},
    status: {},
    permission: {},
})

module.exports = mongoose.model('Book Request', bookrequestSchema)