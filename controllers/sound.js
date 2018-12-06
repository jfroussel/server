const Sound = require("../models/sound")
const lodash = require("lodash")


exports.create = (req, res, next) => {
    const url = req.body.url

    Sound.findOne({ url }, (err, existingUrl) => {
        if (err) {
            return next(err)
        }
        if (existingUrl) {
            return res.status(422).send({ error: "url already exist !" })
        }
        if (lodash.isEmpty(url) ) {
            return res.status(422).send({ error: "url empty !" })
        } else {
            const sound = new Sound({
                url
            })
            sound.save((err) => {
                if (err) {
                    return next(err)
                }
                res.send(sound)
            })
        }
    })
}







