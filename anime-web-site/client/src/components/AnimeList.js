import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";

export default function AnimeList({profile}) {
    const [animeInfos,setAnimeInfos] = useState([])
    useEffect(() => {
        axios.post('https://anime-list-app-5k6a-984cn5kad-softwarevirus.vercel.app/u/listMyList',{
            "email":profile.email
        })
        .then((response) => setAnimeInfos(response.data))
        .catch(err => console.log(err))
    },[])
    return(
        <div className="anime-list-container">
            {animeInfos.map(item => {
                return <AnimeCard key={item._id} setAnimeInfos={setAnimeInfos} _id={item._id} user={profile} name={item.name} image={item.image} description={item.description} point={item.point} delete={true}/>
            })}
        </div>
    );
}
