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
                username: username
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





