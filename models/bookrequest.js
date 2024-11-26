var mongoose = require('mongoose')
const { permission } = require('process')
var Schema = mongoose.Schema
var bookrequestSchema = new Schema({
    readerId: {},
    bookId: {},
    requestDate: {
        type: Date,
        default: Date.now
    },
    expectedReturnDate: {
        type: Date
    },
    returnDate: {
        type: Date
    },
    GenreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    },
    status: {},
    permission: {},
})

module.exports = mongoose.model('Book Request', bookrequestSchema)