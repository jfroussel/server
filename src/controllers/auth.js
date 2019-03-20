const User = require("../models/user")
const lodash = require("lodash")
const jwt = require("jwt-simple")
const config = require("../config")
const axios = require("axios")

// create token
function getToken(user) {
    const timeStamp = new Date().getTime()
    return jwt.encode({
        sub: user.id,
        iat: timeStamp
    }, config.secret)
}

exports.signup = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const username = req.body.username
    const subscribe = req.body.subscribe
    User.findOne({ email: email }, (err, existingEmail) => {
        if (err) {
            return next(err)
        }
        if (existingEmail) {
            return res.status(422).send({ error: "email already exist !" })
        }
        if (lodash.isEmpty(email) || lodash.isEmpty(username) || lodash.isEmpty(password)) {
            return res.status(422).send({ error: "email / username or password empty !" })
        } else {
            const user = new User({
                email: email,
                password: password,
                username: username,
                subscribe: subscribe
            })
            user.save((err) => {
                if (err) {
                    return next(err)
                }
                res.json({ token: getToken(user) })
            })
        }
    })
}

exports.resetPassword = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    User.findOneAndUpdate({email: email}, {multi:true, new: true }, (err) => {
        if (err) {
            return next(err)
        }
        else {
            const user = {
                password
            }
            res.send(user)
            console.log('user password reset', user)
        }
    })
}

exports.signin = function (req, res, next) {
    console.log('SIGNIN ',req.user)
    res.json({ token: getToken(req.user),info: req.user })
    
}



exports.accounts = (req, res, next) => {
    User.find().then((result) => {
        res.json(result)
    })
}

exports.subscribe = (req, res, next) => {
    console.log('subscribe')
}

exports.unSubscribe = (req, res, next) => {
    console.log('unSubscribe')
}





