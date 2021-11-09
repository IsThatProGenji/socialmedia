import React, { useState } from "react";
import "./Register.css";
import Axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = () => {
        console.log(username);
        Axios.post("http://localhost:3001/user/register", {
            username: username,
            password: password,
        }).then((response) => {
            console.log(response);
        })
    }
    return (
        <div className="outer">
        <div className="Register" style={{marginRight:200}} >
            <h1 style={{marginRight:50}}>Registration</h1>
            <div className="RegisterForm">
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
                <a href="/login">
                    <button
                        onClick={register}  >
                        Register
                     </button>
                </a>
            </div>
        </div>
        </div>
    )

}

export default Register
