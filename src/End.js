import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function End() {

    const grade = useSelector(state => state.grade.value)
    const dispatch = useDispatch();
    return (
        <div  className="container">
            <h1 className="home-title">Quizzical</h1>
            <p className="home-description"> score: {grade}</p>
           <button className="home-button"><Link to="/" className="link">Start new quiz</Link></button>
        </div>
    );
}

export default End;