const Book = require('../models/book')

exports.createBook = function(req, res, next){
    let p1 = req.body
    console.log(req.body)
    var newItem = new Book(p1)
    newItem.save().then(item=>{
        res.json({item: item})
    }).catch(err=>{
        console.log("Falhou", +err)
    })
}

exports.getBookById = function(req, res, next){
    let id = req.params.id
    Book.find({_id:id}).then(function(data) {
        res.status(200).json({
            status: "success",
            data: data
        })
    }).catch(err=>{
        res.status(404).json({
            status: "fail",
            message: "Falhou" + err
        })
    })
}

exports.updateBookById = function(req, res, next){
    let id = req.params.id
    Book.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}).then(function(data) {
        res.status(200).json({
            status: "success",
            data: data
        })
    }).catch(err=>{
        res.status(404).json({
            status: "fail",
            message: "Falhou" + err
        })
    })
}

exports.deleteBookById = function(req, res, next){
    let id = req.params.id
    Book.findByIdAndDelete(id).then(function(data) {
        res.status(200).json({
            status: "success",
            data: null
        })
    }).catch(err=>{
        res.status(404).json({
            status: "fail",
            message: "Falhou" + err
        })
    })
}

exports.getBooks = function(req, res, next){
    Book.find({}).then(function(data) {
        res.status(200).json({
            status: "success",
            data: data
        })
    }).catch(err=>{
        res.status(404).json({
            status: "fail",
            message: "Falhou" + err
        })
    })
}