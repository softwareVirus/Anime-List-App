import React, { useState } from "react";
import AnimeList from '../components/AnimeList'
import { Link } from "react-router-dom";
import EditProfile from '../components/EditProfile'
import '../css/Profile.css'
export default function Profile({profile,setProfile}) {
    const [editProfile,setEditeProfile] = useState(false);
    const ian = {src:"https://i.pinimg.com/736x/16/d4/c8/16d4c86031908fb76cad486905218526.jpg",alt:"anime"};
    const handleAnimeList = (e) => {
        e.preventDefault()
        setEditeProfile(false)
    }
    const handleProfileEditButton = (e) => {
        e.preventDefault()
        setEditeProfile(true)
    }
    return(
        <div className="container-main">
            <div className="add-anime">
                <Link to="add-anime">Add Anime</Link>
            </div>
            <div className="profile-container">
                <div className="profile">
                    <div className="container-profile-infos">
                        <div className="profile-image">
                            <img src={profile.src} alt={profile.alt} width='250px'/>
                        </div>
                        <div className="profile-name">
                            <h3>{profile.name+" "+profile.surname}</h3>
                        </div>
                        <div className="profile-anime-list" onClick={handleAnimeList}>
                            My Anime List
                        </div>
                        <div className="profile-edit" onClick={handleProfileEditButton}>
                            Edit Profile
                        </div>
                    </div>
                </div>
                <div className="second-page">
                    {!editProfile 
                        ?
                        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                            <h2>My Anime List</h2>
                            <AnimeList profile={profile}/>
                        </div>
                        :<EditProfile profile={profile} setProfile={setProfile}/>
                    }
                </div>
            </div>
        </div>
    );
}