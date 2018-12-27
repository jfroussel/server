const assert = require('assert')
const User = require('../models/user')

describe('update user', () => {
    let user1;
    let newUsername = "jeff"
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

    function updateUsernane(promise, done) {
        promise.then(() => {
            User.find({}).then((users) => {
                assert(user1.username === newUsername)
                done()
            })
        })
    }
    it("update by instance", (done) => {
        user1.set('username', newUsername)
        updateUsernane(user1.save(), done) 
    })

    it("update by model", (done) => {
       updateUsernane(User.updateOne({username:"jeffy roussel"},{username:newUsername}), done) 
    })
    
   
})