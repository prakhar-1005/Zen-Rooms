const express = require('express')
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms } = require('../controllers/roomController')
const { verifyAdmin } = require('../utils/verify')
const router = express.Router()


//Create a room
router.post('/:hotelid', verifyAdmin, createRoom)


//Update a room
router.put('/:id', verifyAdmin, updateRoom)


//Delete a room
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom)


//Get a room
router.get('/:id', getRoom)


//Get all the rooms
router.get('/', getAllRooms)


module.exports = router;