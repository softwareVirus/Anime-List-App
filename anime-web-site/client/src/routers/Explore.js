import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import '../css/Explore.css'

function Explore({profile}) {
    const [animeInfos,setAnimeInfos] = useState([]);
    const [data,setData] = useState([]);
    const [reverseOrderName,setReverseOrderName] =useState(true);
    const [reverseOrderPoint,setReverseOrderPoint] =useState(false);
    console.log(data)
    const handleSortName = () => {
        setData(data.sort(function(a,b) {return reverseOrderName ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)}))
        setAnimeInfos(data.filter(item => animeInfos.includes(item)))
        setReverseOrderName(!reverseOrderName);
    }
    const handleSortPoint = () => {
        setData(data.sort(function(a,b) {return reverseOrderPoint ? a.point-b.point : b.point-a.point}))
        setAnimeInfos(data.filter(item => animeInfos.includes(item)))
        setReverseOrderPoint(!reverseOrderPoint);
        console.log(animeInfos)
    }
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setAnimeInfos(data.filter(item => {
            return item.name.includes(e.target.value)
        }))
    }
    useEffect(()=>{
        axios.get('https://anime-aapp.onrender.com/u/getAllInfos')
        .then(response => {console.log(response.data,data);setData(response.data);setAnimeInfos((response.data))})
        .catch(err => console.log(err))
    },[])
    return(
        <div className="container-explore">
            <div className="search">
                <input type="text" placeholder="Search..." onChange={handleSearch}/>
            </div>
            <div className="anime-card-table">        
                <div className="search-and-sort">
                    <div className="sort-name" onClick={handleSortName}>
                        Name
                    </div>
                    <div className="sort-point" onClick={handleSortPoint}>
                        Point
                    </div>
                </div>
                <div className="anime-lists">
                    {animeInfos.map(item => {
                        return <AnimeCard key={item._id} _id={item._id} user={profile} name={item.name} image={item.image} description={item.description} point={item.point} delete={false} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default Explore;
