const express = require('express')
const { createHotel, updateHotel,deleteHotel,getHotel, getAllHotels, countByType, countByCity, getHotelRooms } = require('../controllers/hotelController')
const { verifyAdmin } = require('../utils/verify')

const router = express.Router()


//Create a hotel
router.post('/', verifyAdmin, createHotel)


//Update a hotel
router.put('/:id', verifyAdmin, updateHotel)


//Delete a hotel
router.delete('/:id', verifyAdmin, deleteHotel)


//Get a hotel
router.get('/find/:id', getHotel)


//Get all the hotels
router.get('/', getAllHotels)
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/room/:id',getHotelRooms)   

module.exports = router;