import React, { Fragment,useState } from 'react';
import Home from './routers/Home'
import Login from './routers/Login'
import Signup from './routers/Signup'
import Explore from './routers/Explore'
import Navbar from './components/Navbar'
import Profile from './routers/Profile'
import AddAnime from './routers/AddAnime';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function App() {
  const [profile,setProfile] = useState(null);
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Page content={"home"} profile={profile} setProfile={setProfile}/>}/>
        <Route path='/explore' element={<Page content={"explore"} profile={profile} setProfile={setProfile}/>} />
        {profile == null ? 
          <Fragment>
            <Route path='/login' element={<Page content={"login"} profile={profile} setProfile={setProfile}/>}/>
            <Route path='/signup' element={<Page content={"signup"} profile={profile} setProfile={setProfile}/>}/>
          </Fragment>
         :
         <Fragment>
           <Route path='/profile' element={<Page content={"profile"} profile={profile} setProfile={setProfile}/>}/>
           <Route path='profile/add-anime' element={<Page content={"add-anime"} profile={profile} setProfile={setProfile}/>}/>
         </Fragment>
        }
      </Routes>
    </Router>
    </>
  );
}

const Page = ({
  content,
  profile,
  setProfile,
  data
}) => {
  return(
    <Fragment>
      <Navbar profile={profile} setProfile={setProfile}/>
      {content === "home" ? <Home /> 
      : content === "explore" ? <Explore profile={profile}/> 
      : content === "login" ? <Login setProfile={setProfile}/> 
      : content === "profile" ? <Profile profile={profile} setProfile={setProfile}/> 
      : content === "add-anime" ? <AddAnime />
      : <Signup setProfile={setProfile}/>}
    </Fragment>
  );

}