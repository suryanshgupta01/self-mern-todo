import React from 'react'
import Inputform from '../form/form';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Editform from '../form/Editform';
import CustomToastExample from '../component/SuccessToast';
import { Button, useToast } from '@chakra-ui/react';

const Landingpage = ({ getID }) => {
    const info = JSON.parse(localStorage.getItem('userinfo'))
    const navigate = useNavigate()
    // if (!info) { navigate('/login') }
    const [data, setdata] = useState([]);
    const [popup, setpopup] = useState(false);
    const [popupedit, setpopupedit] = useState(false);
    const baseURL = "http://localhost:4000"
    const toast = useToast()
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${info.token}`
        }
    }
    useEffect(() => {
        axios.get(baseURL + "/", config)
            .then((ele) => setdata(ele.data))
    }, []);

    // useEffect(() => {
    //     const data1 = localStorage.getItem('userinfo')
    //     const data2 = JSON.parse(data1)
    //     if (data2) {
    //         navigate('/')
    //     }
    // }, [navigate]);


    // console.log(data)
    const handlecheckbox = (id) => {
        console.log(id, "handlecheckbox")
        axios.get(baseURL + "/toggle/" + id).then(() => { })
        setdata(data.map((ele) => {
            if (ele._id === id) {
                ele.iscomplete = !ele.iscomplete
            }
            return ele
        }))
    }
    const handleheadingclick = (id) => {
        getID(data, id)
        // console.log(id, "handleheadingclick")

    }
    const deleteclick = (id) => {
        axios.delete(baseURL + "/todo/del/" + id.toString()).then(() => { })
        setdata(data.filter((ele) => ele._id !== id))
    }
    const newtask = (ele) => {
        setdata([ele, ...data])
        // CustomToastExample()
        toast({
            title: 'TODO created.',
            position: 'top-right',
            description: "We've created a todo for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        setpopup(false)
    }

    const [data3, setdata3] = useState({});

    const handleeditclick = (id) => {
        setpopupedit(true);
        const foundData = data.find((ele) => ele._id === id);
        // console.log(foundData)

        setdata3(foundData);
        // console.log(data3)
    }

    // console.log("result", data3);

    const edittask = (ele) => {
        console.log("ele", ele)
        const data6 = (data.map((element) => {
            if (element._id === ele._id) return ele;
            return element;
        }))
        setdata(data6)
        toast({
            title: 'TODO edited.',
            position: 'top-right',
            description: "We've edited a todo for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }
    const Logout = () => {
        navigate('/login')
        localStorage.removeItem('userinfo')
        window.location.reload()
        toast({
            title: 'Logged out.',
            position: 'top-right',
            // description: "We've edoted a todo for you.",
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
    }

    // console.log(data)
    // localStorage.setItem('userinfo', JSON.stringify(info))
    return (
        <>

            {/* <Link to='/description'>DESC</Link> */}
            <p className='welcome'>Welcome,{info ? info.name : 'Buddy'}
                <span><Button onClick={Logout}>Logout</Button></span>
            </p>
            <h1 title='Hint: Deal with it'>This guy is too lazy to add css </h1>
            {popup ?
                <Inputform newtask={newtask} /> : null
            }
            {popupedit ?
                <Editform edittask={edittask} data={data3} /> : null
            }
            <div id='todoid' className='App'>
                {
                    data?.map((ele) => (
                        <>
                            <div className='individual'>
                                < input type='checkbox' onClick={() => handlecheckbox(ele._id)} defaultChecked={ele.iscomplete} />
                                <div className=
                                    {"todohead " + (ele.iscomplete ? "complete" : "")}
                                    onClick={() => handleheadingclick(ele._id)}>
                                    <Link to='/description'>
                                        <p className='text'>
                                            {ele.text}
                                            {
                                                (new Date(ele.createdAt)).getDate !== (new Date(ele.updatedAt)).getDate ? `${(new Date(ele.createdAt)).getDate}(edited)` : ''
                                            }
                                        </p>
                                    </Link>
                                </div>
                                <p className='edittodo' onClick={() => handleeditclick(ele._id)}>EDIT</p>
                                <p className='delete' onClick={() => deleteclick(ele._id)}>DEL</p>
                            </div>
                        </>
                    ))
                }
                <button className='addtodo' onClick={() => setpopup(true)} >+</button>
            </div>

        </>
    );
}

export default Landingpage
