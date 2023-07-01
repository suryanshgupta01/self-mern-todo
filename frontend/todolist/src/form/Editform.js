import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react'

const Editform = ({ edittask, data }) => {
    const taskref = useRef("")
    const descref = useRef("")
    const [ele, setele] = useState({});
    console.log(data)
    useEffect(() => {
        taskref.current.value = data.text
        descref.current.value = data.description
        taskref.current.focus()
    }, []);
    const handleSubmit = () => {
        axios.put('http://localhost:4000/update/' + data._id.toString(), {
            text: taskref.current.value,
            description: descref.current.value
        }).then((data3) => setele(data3))
        edittask(ele)
    }
    return (
        <>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">EDIT task</label><br />
                    <input
                        ref={taskref}
                        id="username"
                        type="text"
                        placeholder="Enter your Task"
                    /><br />
                    <label htmlFor="description">EDIT description</label><br />
                    <input
                        ref={descref}
                        id="description"
                        type="text"
                        placeholder="Enter your description"
                    /><br />
                    <button className="submitbutton" type="submit">
                        Edit task
                    </button>
                </form>

            </div>
        </>
    )
}

export default Editform
