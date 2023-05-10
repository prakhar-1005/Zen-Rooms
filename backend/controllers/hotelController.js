const Hotel = require('../models/Hotel')
const Room = require('../models/Room')


const createHotel = async (req,res,next)=>{

    const newHotel = new Hotel(req.body) 

    try {
        const savedHotel = await newHotel.save()        
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
    
}

const updateHotel = async (req,res,next)=>{

    const {id} = req.params

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate({_id:id},{...req.body}) 
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
    
}



const deleteHotel = async (req,res,next)=>{

    const {id} = req.params

    try {
        const deletedHotel = await Hotel.findOneAndDelete({_id:id}) 
        res.status(200).json("hotel has been deleted")
    } catch (error) {
        next(error)
    }
    
}


const getHotel = async (req,res,next)=>{

    const {id} = req.params

    try {
        const foundHotel = await Hotel.findById({_id:id});

        if(!foundHotel){
            res.status(200).json("No hotel found")
        }else{
            res.status(200).json(foundHotel)
        }
    } catch (error) {
        next(error)
    }
    
}


const getAllHotels = async (req,res,next)=>{
 
    const {min,max,...others} = req.query;  // 'others' can include featured, address, distance etc. except from min and max in the query 

    try {
        const allHotels = await Hotel.find({
            ...others,
            cheapestPrice:{$gt:min || 1 , $lt:max || 999}, // using bitwise OR operator i.e. '|' doesn't work properly. So, we use logical OR '||' operator  
        }).limit(req.query.limit);  
        return res.status(200).json(allHotels)
    } catch (error) {
        next(error)
    }
    
}

const countByCity = async (req,res,next)=>{

    const cities = req.query.cities.split(',')

    try {
        const list = await Promise.all(cities.map((city)=>{
          //return Hotel.find({city:city}).length; -> .find() also extracts all the properties which is not useful here as we only need the count 
            return Hotel.countDocuments({city:city})     // fetches only the count which is must faster
        }));  
        res.status(200).json(list)
        
    } catch (error) {
        next(error)
    }
    
}


const countByType = async (req,res,next)=>{

    
    try {
        const hotelCount = await Hotel.countDocuments({type:'hotel'}) 
        const apartmentCount =await Hotel.countDocuments({type:'apartment'}) 
        const resortCount =await Hotel.countDocuments({type:'resort'}) 
        const villaCount =await Hotel.countDocuments({type:'villa'}) 
        const cabinCount =await Hotel.countDocuments({type:'cabin'}) 

        res.status(200).json([
            {type:'hotel',count:hotelCount},
            {type:'apartment',count:apartmentCount},
            {type:'resort',count:resortCount},
            {type:'villa',count:villaCount},
            {type:'cabin',count:cabinCount},
        ])

    } catch (error) {
        next(error)
    }
    
}


const getHotelRooms = async(req,res,next) =>{
    try {
        const hotel  =await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room)=>{
                return Room.findById(room)
            })
        )
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

module.exports={
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getAllHotels,
    countByCity,
    countByType,
    getHotelRooms
}







