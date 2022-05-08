import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'



function Login({setProfile}) {
    const navigate = useNavigate()
    const [errorMessage,setErrorMessage] = useState('');
    const handleLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/u/login',{
            "email":e.target.email.value,
            "password":e.target.password.value
        })
        .then(response => {navigate("/profile");setProfile(response.data)})
        .catch(err => {console.log(err);setErrorMessage(err.response.data.message)})
    }
    return(
        <div className="container-login">
            <form action="/profile" onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="form-login-container"><br/>
                    <legend>Email</legend><br/>
                    <input type="text" name="email"/><br/>
                    <legend>Password</legend><br/>
                    <input type="password" name="password"/><br/>
                </div>
                <div className="container-login-submit">
                    <input type="submit" name="Login" value="Login"/>
                </div>
                <div className={errorMessage !== '' ? "errorMessage" : ""}>
                    {errorMessage}
                </div>
            </form>
        </div>
    );
}

export default Login;