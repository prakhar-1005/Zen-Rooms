const createError =(status,message)=>{
    // creates a new instance of the 'Error' object in JavaScript and assigns it to the err constant.The 'Error' object has a message property that contains a string describing the error and a stack property that contains a stack trace of the error, showing the sequence of function calls that led up to the error.
    const err = new Error();  
    err.status= status
    err.message = message
    return err
}

module.exports={createError}