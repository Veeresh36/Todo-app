import React from 'react'
import { useState, useEffect } from 'react'
import style from '../components/tasklist.module.css'
import { NavLink, Link } from 'react-router-dom'

function taskslist(setGetData) {

    let [tasks, setTasks] = useState([])
    let [editData, setEditData] = useState(null)
    let [saveData, setSaveData] = useState({ tasktitle: "", taskdescs: "" })


    //btn status update and giving the data to database
    const taskCOmpleteHandler = async (taskid, curStatus) => {
        const newStatus = curStatus === 2 ? 1 : 2;

        let response = await fetch(`http://localhost:5000/updatestatus/${taskid}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tstatus: newStatus })
        });

        let result = await response.json();
        console.log("Backend response:", result);

        // update local state instantly
        setTasks(prevTask =>
            prevTask.map(task =>
                task.taskid === taskid ? { ...task, tstatus: newStatus } : task
            )
        );
    };

    // geting the data from 
    let fetchTasks = async () => {
        let response = await fetch("http://localhost:5000/tasklist")
        let result = await response.json()
        console.log("API data:", result);
        setTasks(result)
    }

    useEffect(() => {
        fetchTasks()
    }, [])


    //edit handler
    let editHandler = (task) => {
        setEditData(task.taskid)
        setSaveData({
            tasktitle: task.title,
            taskdescs: task.descs
        })
    }

    //cancel handler
    let cancelHandler = () => {
        setEditData(null)
    }

    // data handler
    let saveHandler = (e) => {
        let { name, value } = e.target
        setSaveData((existing) => ({
            ...existing, [name]: value
        }))
    }

    // task update handler
    let updateHandler = async (taskid) => {
        let response = await fetch(`http://localhost:5000/reinsertdata/${taskid}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saveData)
        });

        let result = await response.json();
        if (response.status == 200) {
            alert(result.message)
            fetchTasks();
            setEditData(null)
        }
    }

    //delete handler
    let deleteHandler = async (taskid) => {
        let response = await fetch(`http://localhost:5000/deleteData/${taskid}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
        let result = await response.json();
        if (response.status == 200) {
            fetchTasks()
        }
    }

    return (
        <>
            <div className={`${style.container}`}>
                <h1>taskslist</h1><br />
                <div className={`row ${style.row}`}>
                    {tasks.length === 0 ? (
                        <h3>No Tasks Added</h3>
                    ) : (
                        <div className={`${style.col}`}>
                            {tasks.map((task, index) =>
                                <React.Fragment key={task.taskid}>
                                    <div className={`card-body ${style.card}`} target={index}>

                                        <button className={style.card} type="button" data-bs-toggle="offcanvas" data-bs-target={`#offcanvasTop-${task.taskid}`}
                                            aria-controls="offcanvasTop">
                                            <h6 className={style.userid}>{task.taskid}</h6>
                                            <h5 className="card-title">{task.title} ( {task.added} days )</h5>
                                            <p className={`card-text ${style.descShort}`}>{task.descs}</p>
                                            <span>date: {task.taskdate}</span>
                                        </button>

                                        <div className={style.actions}>
                                            {/* <button
                                                    data-bs-target={`#offcanvasTop-${task.taskid}`}
                                                    aria-controls={`offcanvasTop-${task.taskid}`}
                                                    className={`btn w-25 p-2 ${task.tstatus === 2 ? 'btn-success' : 'btn-warning'}`}
                                                    onClick={() => taskCOmpleteHandler(task.taskid, task.tstatus)}>
                                                        {task.tstatus === 2 ? "completed" : "pending"}
                                                </button> */}

                                                <button
                                                    data-bs-target={`#offcanvasTop-${task.taskid}`}
                                                    aria-controls={`offcanvasTop-${task.taskid}`}
                                                    className={`btn p-1 ${task.tstatus === 2 ? "btn-success" : "btn-warning"}`}
                                                    onClick={() => taskCOmpleteHandler(task.taskid, task.tstatus)}
                                                >
                                                    {task.tstatus === 2 ? "completed" : "pending"}
                                                </button>

                                            <button className={`btn w-100 p-1 btn-danger ${style.deleteBtn}`} onClick={() => deleteHandler(task.taskid)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                            </svg>
                                            </button>
                                        </div>
                                    </div >

                                    <div className={`offcanvas offcanvas ${style.bodycontainer}`} tabindex="-1" id={`offcanvasTop-${task.taskid}`} aria-labelledby={`offcanvasTopLabel-${task.taskid}`}>
                                        <div className="offcanvas-header">
                                            <div className={`${style.actions}`}>

                                                    <button
                                                        key={task.taskid}
                                                        data-bs-target={`#offcanvasTop-${task.taskid}`}
                                                        aria-controls={`offcanvasTop-${task.taskid}`}
                                                        className={`btn ${task.tstatus === 2 ? "btn-success" : "btn-warning"}`}
                                                        onClick={() => taskCOmpleteHandler(task.taskid, task.tstatus)}
                                                    >
                                                        {task.tstatus === 2 ? "completed" : "pending"}
                                                    </button>

                                                <div className={style.edits}>
                                                    {editData == task.taskid ? <><button className='btn btn-info me-2' onClick={() => updateHandler(task.taskid)}>Save</button><button className='btn btn-dark' onClick={() => cancelHandler()}>Cancel</button></> : <button className='btn btn-primary' onClick={() => editHandler(task)}>Edit</button>}
                                                </div>
                                            </div>
                                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div className={`offcanvas-body ${style.boxbody}`}>
                                            <div className={style.content}>
                                                <h5 className="card-title" onChange={saveHandler} index='1'>{editData == task.taskid ? <><input value={saveData.tasktitle} name='tasktitle' type='text' /></> : task.title} ( {task.added} days )</h5>

                                                <p className={`card-text`}>{editData == task.taskid ? <><textarea value={saveData.taskdescs} name="taskdescs" onChange={saveHandler} id=""></textarea></> : task.descs}</p>
                                                <span onChange={saveHandler}>date: {task.taskdate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}

                        </div >
                    )}
                </div>
            </div >
        </>
    )
}

export default taskslist






