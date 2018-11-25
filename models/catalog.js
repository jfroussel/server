const mongoose = require('mongoose')
const Schema = mongoose.Schema

const catalogSchema = new Schema({
    title: { type: String, unique:true, uppercase:true },
    description: String,
    filename: { type: String, unique:true, lowercase:true },
    author: String,
    uid:String,
    bpm: Number,
    tone: String,
    genres: Array,
    moods: Array,
    loops: Number,
    lenght:Number,
    instruments: Array,
})


const CatalogModel = mongoose.model("catalog", catalogSchema)
module.exports = CatalogModel