const Catalog = require("../models/catalog")
const lodash = require("lodash")
const axios = require("axios")

// Catalog crud functions

exports.create = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const filename = req.body.filename
    const author = req.body.author
    const uid = req.body.uid
    const bpm = req.body.bpm
    const tone = req.body.tone
    const genres = req.body.genres
    const moods = req.body.moods
    const loops = req.body.loops
    const lenght = req.body.lenght
    const instruments = req.body.instruments

    Catalog.findOne({ title: title }, (err, existingTitle) => {
        if (err) {
            return next(err)
        }
        if (existingTitle) {
            return res.status(422).send({ error: "title already exist !" })
        }
        if (lodash.isEmpty(title) || lodash.isEmpty(filename)) {
            return res.status(422).send({ error: "title or filename empty !" })
        } else {
            const catalog = new Catalog({
                title,
                description,
                filename,
                author,
                uid,
                bpm,
                tone,
                genres,
                moods,
                loops,
                lenght,
                instruments
            })
            catalog.save((err) => {
                if (err) {
                    return next(err)
                }
                res.send(catalog)
            })
        }
    })

}
exports.read = (req, res, next) => {
    const {id} = req.params
    Catalog.findById(id).then( (err,catalog) => {
        if(err) {
            return next(err)
        }
        res.send({result: catalog})
    })
}

exports.readAll = (req, res, next) => {
    Catalog.find().then((response) => {
        res.json(response)
    })
}

exports.update = (req, res, next) => {

}

exports.delete = (req, res, next) => {
    const {id} = req.params
    Catalog.findByIdAndRemove(id).then((err, sound) => {
        if(err) {
            return next(err)
        }
        res.send(sound)
    })
}

exports.signin = function (req, res, next) {
    console.log('SIGNIN ',req.user)
    res.json({ token: getToken(req.user),info: req.user })
}

exports.users = function (req, res, next) {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        res.json(response.data)
    })
}

exports.accounts = (req, res, next) => {
    User.find().then((result) => {
        
        res.json(result)
    })
}





