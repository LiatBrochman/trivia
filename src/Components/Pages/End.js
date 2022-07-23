import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {store} from "../../redux/Store/store";
import {initPage} from "../../redux/Slices/triviaSlice";
import {amountOfQuestions} from "../../index";
import '../../CSS/PagesCSS/End.css';

function End() {

    const grade = useSelector(state => state.grade.value)

    return (
        <div className="end-container">
            <h1 className="end-title">Quizzical</h1>
            <p className="end-description"> score: {grade}</p>
            <button className="end-button" onClick={store.dispatch(initPage({amountOfQuestions}))}><Link to="/" className="end-link">Start new
                quiz</Link></button>
        </div>
    );
}

export default End;