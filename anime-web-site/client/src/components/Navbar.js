import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/Test.css"


function NavbarComp({profile,setProfile}) {
  return (
    <nav className="navbar">
        <div className="container">
            <div className="logo">
                <Link to="/" className="link-text">
                    ANIME
                </Link>
            </div>
            <div className="nav-links">
                <ul>
                    <li>
                        <Link to="/" className="link-text">
                            Home
                        </Link>
                    </li>
                    <li>        
                        <Link to="/explore" className="link-text">
                            Explore
                        </Link>
                    </li>
                </ul>
                {profile == null 
                ?<Fragment>
                    <div className="login">
                        <Link to="/login" className="login-link">Login</Link>
                    </div>
                    <div className="signup">
                        <Link to="/signup" className="signup-link">Sign Up</Link>
                    </div>
                </Fragment>
                : <Fragment>
                    <Link to="/profile">
                        <div className="profile-i">
                            <img src={profile.src} alt={profile.alt} width="30px" height="30px"/>
                            <p>{profile.name+" "+profile.surname}</p>
                        </div>
                    </Link>
                    <div className="login" onClick={(e) => setProfile(null)}>
                        <Link to="/login" className="login-link">Logout</Link>
                    </div>
                </Fragment> }
            </div>
        </div>
    </nav>
  );
}

export default NavbarComp;