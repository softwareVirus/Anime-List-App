import React,{useState} from "react";
import axios from "axios";
import '../css/AddAnime.css'
export default function AddAnime() {
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState({src:"",alt:""});
    const [errMes,setErrMes] = useState("")
    const [errMes2,setErrMes2] = useState("")
    const [errMes3,setErrMes3] = useState("")
    const [succes,setSuccess] = useState("")
    const uploadImage = (e) => {
        e.preventDefault()
        if(image === "")
            return;
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
    const handleNumber = (e) => {
        if((parseFloat(e.target.value).toString() !== e.target.value && parseInt(e.target.value).toString() !== e.target.value) && e.target.value !== "") {
            setErrMes("The Point must contain only float number. To add new anime handle the error")
        } else {
            setErrMes("")
        }
    }
    const handleName = (e) => {
        if(e.target.value === "") {
            setErrMes2("There should be a name")
        } else {
            setErrMes2("")
        }
    }
    const handleDescription = (e) => {
        if(e.target.value === "") {
            setErrMes3("There should be a description")
        } else {
            setErrMes3("")
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(e.target.name.value === "" || e.target.description.value === "" || e.target.point.value === "" || errMes !== "") {
            if(e.target.name.value === "") {
                setErrMes2("There should be a name")
            }
            if(e.target.description.value === "") {
                setErrMes3("There should be a description")
            }
            if(e.target.point.value === "" || ((parseFloat(e.target.point.value).toString() !== e.target.point.value || parseInt(e.target.point.value).toString() !== e.target.point.value))) {
                setErrMes("There should be a point")
            }
            return;
        }
        if(parseFloat(e.target.point.value) > 10) {
            setErrMes("The point value must be less equal to 10")
            return;
        }
        axios.post('https://anime-sed.herokuapp.com/u/addAnimeCard',{
            "src" :url.src,
            "alt":url.alt === undefined ? "anime-photo" : url.alt,
            "name": e.target.name.value,
            "description" : e.target.description.value,
            "point": e.target.point.value
        })
        .then(() => {setSuccess("Anime is added");console.log("OKİ")})
        .catch(err => {if(err.response.data.message === "Anime is already exist") setSuccess("Anime is added");console.log(err)})
    }
    return(
        <div className="edit-profile-container">
            <h1>Add Anime</h1>
            <form method="post" onSubmit={handleSubmit}>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between", height:"270px"}}>
                    <img src={url.src} alt={url.alt} width="200px" height="200px"/>    
                    <input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
                    <button onClick={uploadImage} style={{width:"120px"}}>Add Photo</button>
                </div>
                <div className="edit-profile">
                    <legend>Name</legend>
                    <input type="text" name="name" onChange={handleName}/>
                    <legend>Description</legend>
                    <textarea name="description" onChange={handleDescription}></textarea>
                    <legend>Point</legend>
                    <input type="text" name="point" onChange={handleNumber}/>
                    <br/>
                    <input type="submit" value="Add Anime"/>
                </div>
            </form>
            <div className={errMes !== "" ? "errorMessage" : ""}>
                {errMes}
            </div>
            <div className={errMes2 !== "" ? "errorMessage" : ""}>
                {errMes2}
            </div>
            <div className={errMes3 !== "" ? "errorMessage" : ""}>
                {errMes3}
            </div>
            <div className={succes === "" ? "" : "succesMessage"}>
                {succes}
            </div>
        </div>
    );
}

