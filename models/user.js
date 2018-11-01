const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Create user schema
const userSchema = new Schema({
    email: { type: String, unique:true, lowercase:true },
    password: {type: String}
})
const UserModel = mongoose.model("user", userSchema)
module.exports = UserModel