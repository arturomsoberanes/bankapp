const express = require('express');
const router = express.Router()
const userController = require('../controllers/users')
const verifyToken = require('../middlewares/verifyToken')

// Create user
router.post('/create/:name/:email/:password', userController.createUser)

// Get All users
router.get('/all', verifyToken.verifyToken, userController.allUser)

// Get one user 
router.get('/:email', verifyToken.verifyToken, userController.searchUser)

// Update balance for users
router.put('/updateBalance/:email/:balance/:type/:date', verifyToken.verifyToken, userController.updateBalanceUser)

// Delete User
router.delete('/delete/:email', verifyToken.verifyToken, userController.deleteUser)


module.exports = router
