const User = require("../models/user")
const lodash = require("lodash")
module.exports = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email}, (err, existingEmail) => {
        if(err) {
            return next(err)
        }
        if(existingEmail) {
            return res.status(422).send({error: "email already exist !"})
        }
        if(lodash.isEmpty(email) || lodash.isEmpty(password)) {
            return res.status(422).send({ error: "email or password empty !"})
        } else {
            const user = new User({
                email: email,
                password: password
            })
            user.save((err) => {
                if(err) {
                    return next(err)
                }
                res.json(user)
            })
        }
    })
}