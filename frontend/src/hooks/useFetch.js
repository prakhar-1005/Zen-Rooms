import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url)=>{

    const [info,setInfo] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)


    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true)

            try {
                const res = await axios.get(url)
                // console.log(res);
                setInfo(res.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData()   
    },[url])


    const reFetch = async ()=>{
        setLoading(true)

        try {
            const res = await axios.get(url);
            setInfo(res.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    return {info,loading,error,reFetch}   // custom hooks return state values and functions
}

