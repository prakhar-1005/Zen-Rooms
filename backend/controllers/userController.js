const User = require('../models/User')


// We are not writing functions for creating user as we are already doing it via logging in and Signup functions


const updateUser = async (req,res,next)=>{

    const {id} = req.params

    try {
        const updatedUser = await User.findByIdAndUpdate({_id:id},{...req.body}) 
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
    
}


const deleteUser = async (req,res,next)=>{

    const {id} = req.params

    try {
        const deletedUser = await User.findOneAndDelete({_id:id}) 
        res.status(200).json("User has been deleted")
    } catch (error) {
        next(error)
    }
    
}


const getUser = async (req,res,next)=>{

    const {id} = req.params

    try {
        const foundUser = await User.findById({_id:id});

        if(!foundUser){
            res.status(200).json("No user found :(")
        }else{
            res.status(200).json(foundUser)
        }
    } catch (error) {
        next(error)
    }
    
}


const getAllUsers = async (req,res,next)=>{

    const {id} = req.params

    try {
        const allUsers = await User.find();  
        
        if(!allUsers){
            return res.status(200).json("No users found ")
        }else{
            return res.status(200).json(allUsers)
        }
    } catch (error) {
        next(error)
    }
    
}


module.exports={
    updateUser,
    deleteUser,
    getUser,
    getAllUsers
}







