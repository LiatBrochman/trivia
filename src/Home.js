import './Home.css';
import {Link} from "react-router-dom";
import React from "react";
import {useDispatch} from "react-redux";
import {initialGrade} from "./redux/gradeSlice";
import {startPage} from "./redux/pagesSlice";


export default function Home() {
    const dispatch = useDispatch();

    dispatch(initialGrade())
    dispatch(startPage())
    return (
        <div className="container">
            <h1 className="home-title">Quizzical</h1>
            <p className="home-description">Some description if needed</p>
            <button className="home-button"><Link to="/pages" className="link">Start quiz</Link></button>
        </div>
    )

}
