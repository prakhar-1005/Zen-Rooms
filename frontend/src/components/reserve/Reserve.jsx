import React, { useContext, useState } from 'react'
import './reserve.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import { useFetch } from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import "./reserve.css";

const Reserve = ({setOpen,hotelId}) => {

  const [selectedRooms,setSelectedRooms] = useState([])
  const {info,loading,error} = useFetch(`http://localhost:5000/api/hotels/room/${hotelId}`);
  const {dates} = useContext(SearchContext);


  const getDatesInRange = (startDate,endDate)=>{
    const start  =new Date(startDate)
    const end  =new Date(endDate)

    const date = new Date(start.getTime())

    let dates = []
    while(start<=end){
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate()+1)
      start.setDate(start.getDate() + 1);
    }
    return dates
  }


  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable=(roomNumber)=>{
    const isFound = roomNumber.unavailableDates.some((date)=>
      allDates.includes(new Date(date).getTime())
    )
    return !isFound;
  }


  const handleSelect = (e)=>{
    // console.log(e);  IMPORTANT
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked ? [...selectedRooms, value]
      : selectedRooms.filter((item)=>item!==value)
    )
  }

  const handleClick =()=>{

  }

  // console.log(selectedRooms);
  return (
    <div className='reserve'>
        <div className='rContainer'>
          <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={()=> setOpen(false)}/>
          <span>Select your Rooms:</span>
          {info.map((item)=>(
            <div className="rItem">
              <div className="rItemInfo">
                <div className="rTtitle">Title: <b>{item.title}</b></div>
                <div className="rDesc" >Decription: <b>{item.desc}</b></div>
                <div className="rMax" >Maximum People: <b>{item.maxPeople}</b></div>
                <div className="rPrice" >Price: <b>{item.price}</b></div>
                {/* {console.log(item)} */}
              </div>
                {item.roomNumber.map(roomNo=>(
                  <div className='room'>
                    <label>{roomNo.number}</label>
                    <input type='checkbox' value={roomNo._id} onChange={handleSelect} disabled = {!isAvailable(roomNo)}/>
                  </div>
                ))}
            </div>
          ))}
          <button onClick={handleClick} className="rButton">Reserve Now</button>
        </div>
    </div>
  )
}

export default Reserve
