const BookRequest = require('../models/bookrequest')

exports.createBookRequest = function(req, res, next){
    let p1 = req.body
    console.log(req.body)
    var newItem = new BookRequest(p1)
    newItem.save().then(item=>{
        res.json({item: item})
    }).catch(err=>{
        console.log("Falhou", +err)
    })
}

exports.getBookRequestById = function(req, res, next){
    let id = req.params.id
    BookRequest.find({_id:id}).then(function(data) {
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

exports.updateBookRequestById = function(req, res, next){
    let id = req.params.id
    BookRequest.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}).then(function(data) {
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

exports.deleteBookRequestById = function(req, res, next){
    let id = req.params.id
    BookRequest.findByIdAndDelete(id).then(function(data) {
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

exports.getBookRequests = function(req, res, next){
    BookRequest.find({}).then(function(data) {
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