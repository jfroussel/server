const Catalog = require("../models/catalog")
const lodash = require("lodash")
const axios = require("axios")

// Catalog crud functions

exports.create = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const soundUrl = req.body.soundUrl
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
        if (lodash.isEmpty(title) || lodash.isEmpty(soundUrl)) {
            return res.status(422).send({ error: "title or soundUrl empty !" })
        } else {
            const catalog = new Catalog({
                title,
                description,
                soundUrl,
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
exports.update = (req, res, next) => {
    const { id } = req.params
    const {title} = req.body
    const {description} = req.body
    const {soundUrl} = req.body
    const {author} = req.body
    const {uid} = req.body
    const {bpm} = req.body
    const {tone} = req.body
    const {genres} = req.body
    const {moods} = req.body
    const {loops} = req.body
    const {lenght} = req.body
    const {instruments} = req.body

    Catalog.findByIdAndUpdate(id, {$set: req.body}, {multi:true, new: true }, (err) => {
        if (err) {
            return next(err)
        }
        else {
            const sound = {
                title,
                description,
                soundUrl,
                author,
                uid,
                bpm,
                tone,
                genres,
                moods,
                loops,
                lenght,
                instruments
            }
                res.send(sound)
            console.log('UPDATE : ', sound)

        }
    })
}
exports.read = (req, res, next) => {
    const { id } = req.params
    Catalog.findById(id).then((catalog) => {
        console.log('CATALOG : ', catalog)

        res.send(catalog)
    })
}

exports.readAll = (req, res, next) => {
    const {id} = req.params
    Catalog.find({uid:id}).then((response) => {
        console.log('readAll : ', response)
        res.json(response)
    })
}


exports.delete = (req, res, next) => {
    const { id } = req.params
    Catalog.findByIdAndRemove(id).then((sound) => {
        res.send(sound)
    })
}

exports.signin = function (req, res, next) {
    console.log('SIGNIN ', req.user)
    res.json({ token: getToken(req.user), info: req.user })
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





