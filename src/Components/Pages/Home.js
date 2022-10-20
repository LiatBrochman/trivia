import '../../CSS/PagesCSS/Home.css';
import {Link} from "react-router-dom";
import React from "react";
import {useDispatch} from "react-redux";
import {initialGrade} from "../../redux/Slices/gradeSlice";
import {startPage} from "../../redux/Slices/pagesSlice";


export default function Home() {
    const dispatch = useDispatch();

    dispatch(initialGrade())
    dispatch(startPage())
    return (
        <div>
        <div className="home-container">
            <h1 className="home-title">Quizzical</h1>
            <p className="home-description">Press the button to start the quiz</p>
            <button className="home-button"><Link to="/pages" className="home-link">Start quiz</Link></button>
        </div>
        </div>
    )

}
