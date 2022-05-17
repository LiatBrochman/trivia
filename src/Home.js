import './Home.css';
import {Link} from "react-router-dom";
import React from "react";

export default function Home(){
    return(
        <div>
         <h1 className="home-title">Quizzical</h1>
         <p className="home-description">Some description if needed</p>
            <button className="home-button"><Link to="/game" className="link">Start quiz</Link></button>
        </div>
    )

}
