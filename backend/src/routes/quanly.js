const express = require('express')
const router = express.Router()

const quanlyController = require('../app/controllers/QuanLyController')

router.get('/api/quanly', quanlyController.index)

router.post('/api/quanly', quanlyController.create)

router.put('/api/quanly/:MA_LOP', quanlyController.update)

router.delete('/api/quanly/:MA_LOP', quanlyController.delete)

module.exports = router