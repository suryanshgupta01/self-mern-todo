import React from 'react'
import Inputform from '../form/form';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Editform from '../form/Editform';
import CustomToastExample from '../component/SuccessToast';
import { Button, useToast } from '@chakra-ui/react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const defaultTheme = createTheme();

const Landingpage = ({ getID }) => {
    const info = JSON.parse(localStorage.getItem('userinfo'))
    const navigate = useNavigate()
    // if (!info) { navigate('/login') }
    const [data, setdata] = useState([]);
    const [popup, setpopup] = useState(false);
    const [loading, setloading] = useState(true);
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
        setTimeout(() => {
            setloading(true);
            axios.get(baseURL + "/", config)
                .then((ele) => { setdata(ele.data); setloading(false); })
        }, 500);

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

    const justedittask = (task, desc, id) => {

        const data5 = data.map((ele) => { if (ele._id === id) { ele.text = task; ele.description = desc; } return ele })
        setdata(data5)
    }
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

    console.log(data)
    // localStorage.setItem('userinfo', JSON.stringify(info))
    if (loading) return (
        <ThemeProvider theme={defaultTheme}>
            <div>
                Voluntarily set loading
                <div className='ROW'>

                    <Skeleton variant="circular" width={100} height={100} />
                    <Skeleton variant="text" sx={{ fontSize: '4rem' }}
                        style={{ width: '40%' }} />

                    <Skeleton variant="text" sx={{ fontSize: '4rem' }}
                        style={{ width: '40%' }} />
                </div>

                <Skeleton animation="wave" style={{ width: '50%' }} height={60} />
                <Skeleton animation="wave" style={{ width: '50%' }} height={60} />
                <Skeleton animation="wave" style={{ width: '50%' }} height={60} />
                <Skeleton animation="wave" style={{ width: '50%' }} height={60} />
                <Skeleton animation="wave" style={{ width: '50%' }} height={60} />



            </div>
        </ThemeProvider >
    )
  
    return (
        <>

            {/* <Link to='/description'>DESC</Link> */}
            <p className='welcome'>

                <p style={{ gap: '1.5rem', display: 'flex', flexDirection: 'row' }}>
                    <img src={info.image} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} />
                    <section>Welcome,{info.name}</section></p>
                <span>{info.email}<Button onClick={Logout}>Logout</Button></span>
            </p>
            <h1 title='Hint: Deal with it'>This guy is too lazy to add css </h1>
            {popup ?
                <Inputform newtask={newtask} /> : null
            }
            {popupedit ?
                <Editform justedittask={justedittask} data={data3} /> : null
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
                                                (new Date(ele.createdAt)).getDate() !== (new Date(ele.updatedAt)).getDate() ? `(edited)` : ''
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
