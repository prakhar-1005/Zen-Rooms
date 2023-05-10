import React, { useState } from 'react'
import './login.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    // for redirecting the users to home page after logging in 
    const navigate = useNavigate()

    // useState for credentials in the input field
    const [credentials,setCredentials] = useState({
        username:undefined,
        password:undefined
    })

    //using AuthContext
    const {user,loading,error,dispatch} = useContext(AuthContext)


    const handleChange =(e)=>{
        setCredentials((prev) => ( {...prev,[e.target.id]: e.target.value} ))
    }


    const handleClick = async (e)=>{
        e.preventDefault()

        dispatch({type:"LOGIN_START"})

        try {  
            const res = await axios.post("http://localhost:5000/api/auth/login",credentials)
            dispatch({type:"LOGIN_SUCCESS", payload:res.data})
            navigate('/')
        } catch (error) {
            // console.log(error);
            dispatch({type:"LOGIN_FAILURE", payload:error.response.data})
        }
    }



  return (
    <div className='login'>
            <h1>Welcome Back! Please login to continue</h1>
        <div className="lContainer">
            <input type="text" placeholder='username' id='username' onChange={handleChange} className="lInput" />
            <input type="password" placeholder='password' id='password' onChange={handleChange} className="lInput" />
            <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span> }
        </div>
    </div>
  )
}

export default Login
