var mongoose = require('mongoose')
const { permission } = require('process')
var Schema = mongoose.Schema
var bookrequestSchema = new Schema({
    readerId: {
        fullname: mongoose.Schema.Types.ObjectId
    },
    bookId: {
        title: mongoose.Schema.Types.ObjectId
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    expectedReturnDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String,
        required: true,
        enum: ['DRAFT', 'ACCEPTED', 'COMPLETED', 'CANCELLED'],
        default: 'DRAFT'
    },
    permission: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
})

module.exports = mongoose.model('Book Request', bookrequestSchema)