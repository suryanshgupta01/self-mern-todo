import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
function Inputform({ newtask }) {
    // console.log('hello');
    // const [Task, setTask] = useState([]);
    // console.log(Task)
    const taskref = useRef("")
    const descref = useRef("")
    const info = JSON.parse(localStorage.getItem('userinfo'))

    useEffect(() => {
        taskref.current.focus()
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (taskref.current.value === "") {
            alert("Enter a task")
            return
        }
        const data = await axios.post("http://localhost:4000/newtodo", {
            text: taskref.current.value,
            description: descref.current.value,
            author: info.ID

        })
        newtask(data.data)
        console.log(data)
        taskref.current.value = ""
        descref.current.value = ""
        taskref.current.focus()

    }

    return (
        <>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Add task</label><br />
                    <input
                        ref={taskref}
                        id="username"
                        type="text"
                        placeholder="Enter your Task"
                    /><br />
                    <label htmlFor="description">Add description</label><br />
                    <input
                        ref={descref}
                        id="description"
                        type="text"
                        placeholder="Enter your description"
                    /><br />
                    <button className="submitbutton" type="submit">
                        Add task
                    </button>
                </form>

            </div>
            <div>

                {/* {Task.map((ele, ind) => (
                    <p key={ind}>{ind + 1} {ele}</p>
                ))} */}
            </div>
        </>
    );
}

export default Inputform;