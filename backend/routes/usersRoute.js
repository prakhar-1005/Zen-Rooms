const express = require('express')
const User = require('../models/User')
const { updateUser,deleteUser,getUser, getAllUsers } = require('../controllers/userController')
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verify')

const router = express.Router()

// // verifying the token
// router.get('/checkauthentication',verifyToken,(req,res,next)=>{
//     res.send('You are authenticated')
// })

// // checking if the user is authorized to delete his data 
// router.get('/checkuser/:id', verifyUser,(req,res,next)=>{
//     res.send('You are authenticated and you can delete your data now')
// })

// // checking if the user is admin
// router.get('/checkadmin/:id', verifyAdmin,(req,res,next)=>{
//     res.send('Hello admin, you are authenticated now')
// })


//Update a user
router.put('/:id', verifyUser ,updateUser)


//Delete a user
router.delete('/:id',verifyUser ,deleteUser)


//Get a user
router.get('/:id', verifyUser ,getUser)


//Get all the users
router.get('/', verifyAdmin ,getAllUsers)


module.exports = router;