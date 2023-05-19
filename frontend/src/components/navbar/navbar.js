import './navbar.css';
import { Link } from "react-router-dom";
import Navbtn from './components/navbtn';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [currPath, setCurrPath] = useState()
    
    useEffect(() => { 
        var tempPath = window.location.href; 
        setCurrPath(tempPath.split("/")[tempPath.split("/").length-1])
    }, [])
    
  return (
    <div className='bar'>
        <span className='navlink'>
      <Link to="/" onClick={() => setCurrPath("")}>
        <Navbtn linkto={"home"} selected={currPath !== "movies" && currPath !== "shows" ? "selected" : ""}/>
       </Link>
       </span>
       <br/>
       <br/>
       <span className='navlink'>
       <Link to="/movies" onClick={() => setCurrPath("movies")}>
       <Navbtn linkto={"movies"} selected={currPath === "movies" ? "selected" : ""}/>
       </Link>
       </span>
       <br/>
       <br/>
       <span className='navlink'>
       <Link to="/shows" onClick={() => setCurrPath("shows")}>
       <Navbtn linkto={"shows"} selected={currPath === "shows" ? "selected" : ""}/>
       </Link>
       </span>
    </div>
  )
}
