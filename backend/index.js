require('dotenv').config()
const express= require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute')
const usersRoute = require('./routes/usersRoute')
const hotelsRoute = require('./routes/hotelsRoute')
const roomsRoute = require('./routes/roomsRoute')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//express app
const app = express()

//middleware
app.use(cookieParser())
app.use(cors())
app.use(express.json())   // middleware function in the Express framework that parses incoming requests with JSON payloads.

app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/hotels',hotelsRoute);
app.use('/api/rooms',roomsRoute);

//middleware for handling errors
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'Something went wrong'
    const errorStack = err.stack
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:errorStack
    })
})




mongoose.connect(process.env.MONGO_URI)  // it is an asynchronous function (takes some time to connect)
    .then(()=>{
        // listen for requests
        app.listen(5000, ()=>{
            console.log("server is connected to the database and running on port 5000");
        })
    })
    .catch((error)=>{
        throw error;
    })


//setup event listeners for the 'connection' object of the mongoose library that is triggered when MongoDB connection state changes


//When the MongoDB database is disconnected, the 'disconnected' event is emitted and the function passed to on will be called, which in this case logs a message to the console indicating that the MongoDB database is disconnected.
mongoose.connection.on('disconnected',()=>{
    console.log('mongoDB disconnected')
})


//when the MongoDB database is connected, the 'connected' event is emitted and the function passed to on will be called, which in this case logs a message to the console indicating that the MongoDB database is connected.
mongoose.connection.on('connected',()=>{
    console.log('mongoDB connected')
})

