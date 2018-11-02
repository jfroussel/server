const passport = require("passport")
const User = require("../models/user")
const config = require("../config")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const localStrategy = require("passport-local")

//find token in header
const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
}

// create Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    const userId = payload.sub
    User.findById(userId, function(err, user) {
        if(err) {
            return done(err, false)
        }
        if(user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
})
const localOptions = { usernameField : "email", passwordField : "password"}
const localLoginStrategy = new localStrategy(localOptions, function(email, password, done) {
    User.findOne({email}, function(err,user) {
        if(err) return done(err)
        if(!user) return done(null, false)
        user.isPasswordEqualTo(password, function(err, isMatch) {
            if(err) return done(err)
            if(!isMatch) return done(null, false)
            return done(null, user)
        })
    })
})


// use middleware
passport.use(jwtLogin)
passport.use(localLoginStrategy)