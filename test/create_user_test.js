const assert = require('assert')
const User = require('../models/user')

describe('create user', () => {
    it('save user', (done) => {
        const user1 = new User({
            email: "jeffy33@free.fr" ,
            password: "toto" ,
            username: "jeffy roussel"
        })
        user1.save().then(() => {
            assert(!user1.isNew)
            done()
        })
    })
})