import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import style from '../components/sideMenu.module.css'



function sideMenu() {
    return (
        <>
            <div className={`${style.sideMenuContainer} d-flex flex-column flex-shrink-0 p-3 text-white bg-dark`}>
                <ul className={`nav nav-pills flex-column mb-auto ${style.sideMenu} `}>
                    <li className={`nav-item ${style.navItems}`}>
                        <NavLink aria-current="page" to="/tasks" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>tasks</NavLink>
                    </li>
                    {/* <li className={`nav-item ${style.navItems}`}>
                        <NavLink className="nav-link" to="/longtask">Long Term Tasks</NavLink>
                    </li>
                    <li className={`nav-item ${style.navItems}`}>
                        <NavLink className="nav-link" to="/budget">Budget Handling</NavLink>
                    </li>
                    <li className={`nav-item ${style.navItems}`}>
                        <NavLink className="nav-link" to="/journal">Journal</NavLink>
                    </li> */}
                <Link className={`navbar-brand ${style.logo}`} to="/"><img src='/ng.png' alt="Noted." /></Link>
                </ul>
            </div>
        </>
    )
}

export default sideMenu
