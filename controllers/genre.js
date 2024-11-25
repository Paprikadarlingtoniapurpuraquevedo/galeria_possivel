const Genre = require('../models/genre')

exports.createGenre = function(req, res, next){
    let p1 = req.body
    console.log(req.body)
    var newItem = new Genre(p1)
    newItem.save().then(item=>{
        res.json({item: item})
    }).catch(err=>{
        console.log("Falhou", +err)
    })
}

exports.getGenreById = function(req, res, next){
    let id = req.params.id
    Genre.find({_id:id}).then(function(data) {
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

exports.updateGenreById = function(req, res, next){
    let id = req.params.id
    Genre.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}).then(function(data) {
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

exports.deleteGenreById = function(req, res, next){
    let id = req.params.id
    Genre.findByIdAndDelete(id).then(function(data) {
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

exports.getGenres = function(req, res, next){
    Genre.find({}).then(function(data) {
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