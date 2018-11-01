const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressServer = express()
const router = require('./route')
const http = require('http')
const mongoose = require('mongoose')
mongoose.connect(
    'mongodb://jeff:JFRtnjsjade2010@ds147213.mlab.com:47213/reactsound',
    {useNewUrlParser: true}
)
mongoose.connection
.once("open", () => console.log("connected to Reactsound Mlab"))
.on("error", error => console.log('connection error', error))

expressServer.use(morgan('combined'))
expressServer.use(bodyParser.json({type: '*/*'}))
const port = 3090
const server = http.createServer(expressServer)
router(expressServer)
server.listen(port)
console.log(`welcome node server reactsound !  on port:`,port )