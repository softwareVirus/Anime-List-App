import axios from "axios";
import React,{useState} from "react";
import '../css/EditProfile.css'


export default function EditProfile({profile,setProfile}) {
    const [image, setImage ] = useState("");
    const [errMes1,setErrMes1] = useState("");
    const [errMes2,setErrMes2] = useState("");
    const [updateSucces,setUpdateSucces] = useState("");
    const [ url, setUrl ] = useState({src:profile.src,alt:profile.alt});
    const uploadImage = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "tutorial")
        data.append("cloud_name","breellz")
        fetch("  https://api.cloudinary.com/v1_1/breellz/image/upload",{
            method:"post",
            body: data
        })
        .then(resp => resp.json())
        .then(data => {
            setUrl({
                src:data.url,
                alt:data.alt
            })
        })
        .catch(err => console.log(err))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(e.target.password.value !== e.target.password_confirm.value || (e.target.email.value === "")) {
            if(e.target.email.value === "") {
                setErrMes2("Enter valid email")
                setUpdateSucces("")
            }
            else
                setErrMes2("")
            if(e.target.password.value !== e.target.password_confirm.value){
                setErrMes1("The password must match with the confirm password!");
                setUpdateSucces("")
            }else
                setErrMes1("")
            return;
        }
        axios.post('https://anime-sed.herokuapp.com/u/updateProfile',({
            "img": url,
            "name": e.target.name.value !== "" ? e.target.name.value : profile.name,
            "surname" : e.target.surname.value !== "" ? e.target.surname.value : profile.surname,
            "email" : e.target.email.value,
            "old_email":profile.email,
            "password" :e.target.password.value
        }))
        .then((response) => {
            setErrMes1("")
            setErrMes2("")
            const data = {
                src: response.data.image.src,
                alt: response.data.image.alt,
                name: response.data.name,
                surname: response.data.surname,
                email: response.data.email
            }
            setProfile(data)
            setUpdateSucces("You update your profile")
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between", height:"270px"}}>
                <img src={url.src} alt={url.alt} width="200px" height="200px"/>    
                <input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
                <button onClick={uploadImage} style={{width:"120px"}}>Change Profile</button>
            </div>
            <form method="post" onSubmit={handleSubmit}>
                
                <div className="edit-profile">
                    <legend>Name</legend>
                    <input type="text" name="name" />
                    <legend>Surname</legend>
                    <input type="text" name="surname"/>
                    <legend>Email</legend>
                    <input type="text" name="email" />
                    <legend>Password</legend>
                    <input type="password" name="password" placeholder="password" minLength={8}/>
                    <legend>Password Confirm</legend>
                    <input type="password" name="password_confirm" placeholder="confirm password" minLength={8} />
                    <br/>
                    <input type="submit" value="Update"/>
                    <div className={errMes1 === "" ? "" : "errorMessage"}>
                        {errMes1}
                    </div>
                    <div className={errMes2 === "" ? "" : "errorMessage"}>
                        {errMes2}
                    </div>
                    <div className={updateSucces === "" ? "" : "succesMessage"}>
                        {updateSucces}
                    </div>
                </div>
            </form>
        </div>
    );

}