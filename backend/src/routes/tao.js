const express = require('express')
const router = express.Router()

const taoController = require('../app/controllers/TaoController')

router.get('/api/tao', taoController.index)

router.post('/api/tao', taoController.create)


module.exports = router