const port = 3004

//fazer o parser no corpo da req para entregar o obj pronto
const bodyParser = require('body-parser')

const express = require('express')
const server = express()

const allowCors = require('./cors')
const queryParser = require('express-query-int')

//pra toda requisição em url enconded
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}!!!`)
})

module.exports = server