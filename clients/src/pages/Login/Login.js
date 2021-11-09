import React, { useState } from 'react'
import './Login.css'
import Axios from "axios"

import { useHistory } from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("")

    const refreshPage = () => {
        window.location.reload();
    }
    let history = useHistory()

    const Login = () => {
        Axios.post("http://localhost:3001/user/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.loggedIn) {
                localStorage.setItem("loggedIn", true)
                localStorage.setItem("username", response.data.username)
                history.push("/")
                refreshPage()
            } else {
                setErrorMessage(response.data.message);
            }
        })
    }
    return (
        <div className="outer">
            <div className="Login">
                <h1 style={{marginRight:50}}>Login</h1>
                <div className="LoginForm">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(event) => {
                            setUsername(event.target.value)

                        }}

                    />
                    <input
                        type="Password"
                        placeholder="Password"
                        onChange={(event) => {
                            setPassword(event.target.value)

                        }}

                    />
                    <button onClick={Login}> Login</button>

                </div>

            </div>
            <div className="message">
                <h1 style={{ fontSize: 20, color: "red" }}>{errorMessage}</h1>
            </div>
        </div>

    )
}

export default Login
