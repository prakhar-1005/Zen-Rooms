const User = require("../models/User")
const bcrypt = require('bcrypt');
const { createError } = require("../utils/error");
const jwt = require('jsonwebtoken')

//Register user
const register =async (req,res,next)=>{

    try {
        // const newUser = new User({
        //     username:req.body.username,
        //     email:req.body.email,
        //     password:req.body.password
        // })

        // await newUser.save()

        const salt =await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password,salt)

        const newUser = await User.create({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })
        
        res.status(201).send('user created')
    } catch (error) {
        next(error)
    }

}



//Login user
const login =async (req,res,next)=>{

    try {
        //check if the username exists or not before comparing passwords 
        const user = await User.findOne({username:req.body.username})
        if(!user){
            return next(createError(404,"Username does not exist"))
        }
        
        // compare the passwords
        const compare = await bcrypt.compare(req.body.password,user.password)

        if(!compare)
            return next(createError(400,"Incorrect Password"))
        
        // generate a JSON Web token
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT);

        // We should not the 'password' and the 'isAdmin' field with the res. So when we extract them from the 'user' object and send the ...otherProperties, we see that the actual user data lies in 'user._doc' so instead of extracting from user we extract it directly from the 'user._doc'  
        // const {password, isAdmin, ...otherDetails} = user 
        
        const {password, isAdmin, ...otherDetails} = user._doc
        res.cookie('access_token', token,{
            httpOnly:true,
        }).status(200).json({...otherDetails})

    } catch (error) {
        next(error)
    }

}

module.exports ={
    register,
    login
} 