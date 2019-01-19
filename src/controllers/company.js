const Company = require('../models/company')
const _ = require("lodash")

exports.create = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const country = req.body.country

    Company.findOne({ name: name }, (err, existingCompany) => {
        if (err) {
            
            return next(err)
        }
        if (existingCompany) {
           
            return res.status(422).send({ error: "Company allready exist" })
        }
        if (_.isEmpty(name)) {
           
            return res.status(422).send({ error: "Field name is empty" })
        } else {
            const company = new Company({
                name,
                email,
                country
            })
            company.save((err) => {
                if (err) {
                    return next(err)
                }
                console.log(res)
                res.send(company)
            })
        }
    })
}

exports.update = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const country = req.body.country
    const { id } = req.params

    Company.findByIdAndUpdate(id, { $set: req.body }, {multi:true, new: true }, (err) => {
        if (err) {
            return next(err)
        }
        else {
            const company = {
                name,
                email,
                country
            }
            res.send(company)
            console.log('update company', company)
        }
    })
}

exports.readAll = (req, res, next) => {
    Company.find({})
        .then((response) => {
            console.log('read all companies ', response)
            res.json(response)
        })
}

exports.read = (req, res, next) => {
    const { id } = req.params
    Company.findById(id)
        .then((response) => {
            console.log('Company', response)
            res.json(response)
        })
}

exports.delete = (req, res, newt) => {
    const { id } = req.params
    Company.findByIdAndRemove(id)
        .then((response) => {
            res.send(response);
        })
}