const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    name: { type: String },
    email: { type: String },
    country: { type: String }
})

const CompanyModel = mongoose.model('company', companySchema)

module.exports = CompanyModel