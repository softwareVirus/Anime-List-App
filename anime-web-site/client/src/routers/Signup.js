import React, { useState } from "react";
import '../css/Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Signup({setProfile}) {
    const [errMes1,setErrMes1] = useState("")
    const [errMes2,setErrMes2] = useState("")
    const [errMes3,setErrMes3] = useState("")
    const [errMes4,setErrMes4] = useState("")
    const navigate = useNavigate()
    const handleSignUp = (e) => {
        e.preventDefault()
        const a = e.target
        if(a.name.value === "" || a.surname.value === "" || a.email.value === "" || a.password.value === "") {
            if(a.name.value === "")
                setErrMes1("Enter a name")
            if(a.surname.value === "")
                setErrMes2("Enter a surname")
            if(a.email.value === "")
                setErrMes3("Enter a email")
            if(a.password.value.length < 8)
                setErrMes4("Password length must be at least 8")

            return;
        }
        console.log(e.target)
        axios.post("https://anime-sed.herokuapp.com/u/signup",{
            "img":null,
            "name": e.target.name.value,
            "surname": e.target.surname.value,
            "email": e.target.email.value,
            "password": e.target.password.value
        })
        .then((res) => {
            const data = {
                src : res.data.image.src,
                alt : res.data.image.alt,
                name : res.data.name,
                surname : res.data.surname,
                email : res.data.email
            }
            setProfile(data)
            navigate('/profile')
        })
        .catch((err) => console.log(err))
    }
    return(
        <div className="container-form">
            <h1>Sign up</h1>
            <form onSubmit={handleSignUp}>
                <legend>Name :</legend>
                <input type="text" name="name"/>
                <br/>
                <legend>Surname :</legend>
                <input type="text" name="surname"/>
                <br/>
                <legend>Email :</legend>
                <input type="text" name="email"/>
                <br/>
                <legend>Password :</legend>
                <input type="password" name="password" minLength={8}/>
                <br/>
                <div className="submit">
                    <input type="submit" name="Signup" value="Sign up"/>
                </div>
                <div className={errMes1 !== '' ? "errorMessage" : ""}>
                    {errMes1}
                </div>
                <div className={errMes2 !== '' ? "errorMessage" : ""}>
                    {errMes2}
                </div>
                <div className={errMes3 !== '' ? "errorMessage" : ""}>
                    {errMes3}
                </div>
                <div className={errMes4 !== '' ? "errorMessage" : ""}>
                    {errMes4}
                </div>
            </form>
        </div>
    );
}

export default Signup;
