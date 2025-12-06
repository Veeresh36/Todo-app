import React from 'react'
import { useState } from 'react'
import style from '../components/dataadd.module.css'
import { useNavigate } from 'react-router-dom';

function dataadd(getdata) {

    const [isHovered, setIsHovered] = useState(true);
    let [getdata, setGetData] = useState({ title: "", descs: "" });
    let [ emptyData, setEmptyData ] = useState(false)


    let textBoxHandler = (e) => {
        let { name, value } = e.target
        setGetData((existing) => ({
            ...existing, [name]: value  
        }))
    }



    let SubmitHandler = async (e) => {
        e.preventDefault()
        let response = await fetch("http://localhost:5000/insertData", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(getdata)
        })
        let result = await response.json()

        if (response.status === 200) {
            alert(result.message);
            getdata()
            setGetData({ title: "", descs: "" }); // reset after submiting the data
        }
    }


    return (
        <>
            <div className="conatiner">
                <div className="toolbox">
                    <div className={style.taskCreate} style={isHovered ? { display: "none" } : { display: "block" }}>Create task</div>
                    <button className={`btn btn-primary ${style.btn}`} onMouseEnter={() => setIsHovered(false)} onMouseLeave={() => setIsHovered(true)} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">+</button>

                    <div className="offcanvas offcanvas-end w-50" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasRightLabel">Let’s plan it</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className={`offcanvas-body ${style.offcanvasBody}`}>
                            <div className={style.container}>
                                <div className={style.card}>
                                    <form onSubmit={SubmitHandler}>
                                        <div className="mb-3">
                                            <span>Title</span>
                                            <input type="text" name='title' onChange={textBoxHandler} placeholder='Name your next step' required/>
                                        </div>

                                        <div className="mb-3">
                                            <span>Description</span>
                                            <textarea id="" name='descs' onChange={textBoxHandler} placeholder='Add notes to make it easier later' rows={8}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <input type="submit" className='btn btn-primary w-25' aria-label="Close" data-bs-dismiss="offcanvas"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default dataadd
