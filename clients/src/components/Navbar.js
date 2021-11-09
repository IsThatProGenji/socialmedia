import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Navbar() {

    const [loggedIn, setLoggedIn] = useState()

    useEffect(() => {
        setLoggedIn(localStorage.getItem("loggedIn"))
    }, [localStorage.getItem("loggedIn")])

    const refreshPage = () => {
        window.location.reload();
    }
    const Logout = () => {

        localStorage.setItem("loggedIn", false)
        localStorage.setItem("username", "")

    }
    if (localStorage.getItem("username", "")) {
        return (

            <div className="Background">
                <div className="Navbar">

                    <div className="Profile"><a href="/"><div className="Homeimg"><HomeRoundedIcon /></div>Home</a></div>
                    <div className="Profile"> <a href="/upload"><div className="Uploadimg"><CloudUploadOutlinedIcon /></div>Upload</a></div>
                    <div className="Profile"> <a href="/profile"><div className="Profileimg"><PersonRoundedIcon /></div>Profile</a></div>
                    <div className="Profile">   <div className="Logout"><b href="/"><button onClick={() => {
                        Logout()
                        refreshPage()
                    }}><div className="Profileimg">< ExitToAppIcon /></div>Logout</button></b></div></div>

                </div>

            </div>
        )
    }
    return (
        <div className="Navbar">
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>

        </div>
    )

}

export default Navbar


