import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {store} from "./redux/store";
import {initPage} from "./redux/triviaSlice";
import {amountOfQuestions} from "./index";

function End() {

    const grade = useSelector(state => state.grade.value)

    return (
        <div className="container">
            <h1 className="home-title">Quizzical</h1>
            <p className="home-description"> score: {grade}</p>
            <button className="home-button" onClick={store.dispatch(initPage({amountOfQuestions}))}><Link to="/" className="link">Start new
                quiz</Link></button>
        </div>
    );
}

export default End;