const Room = require('../models/Room') 
const Hotel = require('../models/Hotel') 
const { createError } = require("../utils/error");



const createRoom = async (req,res,next)=>{

    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $push: {rooms:savedRoom._id}   // $push is used to enter data in an array in mongoDB. It adds the id of the room just created inot the 'rooms' array (present in Hotel model)
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}



const updateRoom =async (req,res,next)=>{

    const {id} = req.params

    try {
        const updatedRoom = await Room.findByIdAndUpdate({_id:id},{...req.body})        
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)   
    }

}



const deleteRoom = async (req,res,next)=>{
    const {id,hotelid} = req.params
    try {
        const deletedRoom = await Room.findByIdAndDelete({_id:id})
        try {
            await Hotel.findByIdAndUpdate(hotelid,{
                $pull: {rooms:req.params.id}   
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json(deletedRoom)
    } catch (error) {
        next(error)
    }
}


const getRoom = async (req,res,next)=>{

    const {id} = req.params
    try {
        const searchedRoom = await Room.findById({_id:id})
        res.status(200).json(searchedRoom)
    } catch (error) {
        next(error)
    }
}


const getAllRooms = async (req,res,next)=>{

    const {id} = req.params

    try {
        const allHotels = await Room.find();  
        
        if(!allRoom){
            return res.status(200).json("No Rooms found :(")
        }else{
            return res.status(200).json(allRooms)
        }
    } catch (error) {
        next(error)
    }
    
}


module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getAllRooms
}