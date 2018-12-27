const assert = require('assert')
const User = require('../models/user')

describe('read user', () => {
    let user1;
    beforeEach((done) => {
        user1 = new User({
            email: "jeff@free.fr" ,
            password: "toto" ,
            username: "jeffy roussel"
        })
        user1.save().then(() => {
            done()
        })
    })
    
    it('find a user in collection', (done) => {
        User.find({email:"jeff@free.fr"}).then((users) => {
            assert(users[0]._id.equals(user1._id))
            done()
        })
    })

    it('find a user by id', (done) => {
        User.findOne({_id:user1._id}).then((user) => {
            assert(user.username === 'jeffy roussel')
            done()
        })
    })
})