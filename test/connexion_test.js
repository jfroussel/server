/**
 * connexion  to mongodb test
 */

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

before((done) => {
    mongoose.connect("mongodb://localhost/rstest", {
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    
    mongoose.connection
        .once('open', () => {
            console.log('connexion ok');
            done()
        })
        .on('error', (error) => console.warn('message error :  ', error))
})

beforeEach('delete users collection', (done) => {
    const {users} = mongoose.connection.collections
    users.drop(() => {
        done()
    })
})

