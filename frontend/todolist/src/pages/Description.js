import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Description = ({ ID, data1 }) => {
    let data = {};
    // console.log("desc", data1, ID)
    // data = data1.filter((ele) => ele._id === ID)
    for (let ele of data1) {
        if (ele._id === ID) data = ele
    }



    let hour = (new Date(data.createdAt)).getHours()
    let day = (new Date(data.createdAt)).getDate()
    let month = (new Date(data.createdAt)).getMonth()
    let year = (new Date(data.createdAt)).getFullYear()
    let min = (new Date(data.createdAt)).getMinutes()
    let sec = (new Date(data.createdAt)).getSeconds()
    let meridian = " AM"
    if (hour >= 12) meridian = " PM"
    return (
        < div >
            {/* {loading ? <p>loading</p> : */}
            <div>
                <p>{data.text}</p><p className='time'>{hour}:{min}{meridian} on {day}/{month + 1}/{year}</p>
                <span>{data.description}</span>

                < Link to='/' className='back' > BACK</Link >
            </div>
            {/* } */}
        </div >

    )
}

export default Description
