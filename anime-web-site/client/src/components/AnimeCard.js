import axios from "axios";
import React from "react";
import '../css/AnimeCard.css'

const AnimeCard = (props) => {
    console.log(props)
    const handleAddOrDelete = (e) => {
        e.preventDefault()
        console.log(e.target.delete)
        if(e.target.value === "Add List") 
            axios.post('https://anime-aapp.onrender.com/u/addAnimeToMyList',{
                "user":props.user,
                "_id":props._id,
                "image":props.image,
                "name":props.name,
                "description":props.description,
                "point":props.point
            })
            .then(() => console.log('Anime Added'))
            .catch(err => console.log(err))
        else {
            console.log("hello",props)
            axios.delete('https://anime-aapp.onrender.com/u/deleteAnimeToMyList',{
                headers:{
                    "name":props.name,
                    "e_mail":props.user.email
                }
            })
            .then((response) => props.setAnimeInfos(response.data.list))
            .catch(err => console.log(err))
        }
            
    }
    const point = Math.floor(props.point*100)/100;
    return(
        <div className="anime-card-container">
            <div className="anime-card-image">
                <img src={props.image.src} alt={props.image.alt} width="100px"/>
            </div>
                <div className="anime-card-info">
                    <h2>
                        {props.name}
                    </h2>
                    <div>
                        {props.description}
                    </div>
                </div>
                <div className="anime-card-point">
                    <h1>&#9733;{point}</h1>
                </div>
                <div className="anime-card-add-list">
                    <input type="submit" value={props.delete ? "Delete" : "Add List"} name={props.delete ? "delete" : "add-list"} onClick={handleAddOrDelete} />
                </div>
            </div>
    );
}


export default AnimeCard;
