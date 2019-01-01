const mongoose = require('mongoose')
const Schema = mongoose.Schema

const soundSchema = new Schema({
    url: { type: String, unique:true},
})


const SoundModel = mongoose.model("sound", soundSchema)
module.exports = SoundModel