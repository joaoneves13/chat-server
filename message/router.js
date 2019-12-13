const express = require('express')
const { Router } = express
const Message = require('./model')
const router = new Router()

router.get('/message', (req, res, next) => {
    Message
    .findAll()
    .then(messages => {res.send(messages)})
    .catch(next)
})

module.exports = router