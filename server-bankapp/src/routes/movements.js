const express = require('express');
const router = express.Router()
const moveController = require('../controllers/movements')
const verifyToken = require('../middlewares/verifyToken')

router.get('/:email', verifyToken.verifyToken, moveController.getMovements)

module.exports = router
