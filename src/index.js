const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
};
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressServer = express()
const router = require('./route')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const Mailchimp = require('mailchimp-api-v3')

mongoose.connect(
    'mongodb://51.15.190.152:27017/server',
    { useCreateIndex: true, useNewUrlParser: true }
)

mongoose.connection
    .once("open", () => console.log("connected to Reactsound server"))
    .on("error", error => console.log('connection error', error))
expressServer.set('json spaces', 2)
expressServer.use(morgan('combined'))
expressServer.use(bodyParser.json({ type: '*/*' }))
expressServer.use(cors())
expressServer.use(fileUpload())
expressServer.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,options))

const port = 3050

const server = http.createServer(expressServer)
router(expressServer)

server.listen(port,() => {
    console.log(`welcome node server reactsound !  on port:`, port)
})


