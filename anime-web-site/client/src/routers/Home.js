import React from "react";
import '../css/Home.css'

function Home() {
    return(
        <div className="home-container">
            <div>
                <h1>
                    ANIME LIST
                </h1>
                <p style = {{font-size:"2rem"}}>
                    Anime list is a MERN (MongoDB + Express.js + React.js + Node.js) stack web application. 
                    You can add your own favorite animes to your list within the web application and 
                    help by adding anime that are not on the list
                </p>
            </div>
        </div>
    );
}

export default Home;
