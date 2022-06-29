import './Pages.css';
import React from 'react';
import {useSelector} from "react-redux";
import Game from "./Game";
import {nextPage, previousPage} from "./redux/pagesSlice";

import {store} from "./redux/store";
import {initPage} from "./redux/triviaSlice";

export default function Pages() {
    let trying = store.getState().trivia
    if(trying instanceof Array && trying.length === 0)  store.dispatch(initPage())// if index.js didnt work
    const questionsPerPage = 5;
    let page_number = useSelector(state => state.pages.currentPage)
    const indexOfLastQuestion = page_number * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    let page = useSelector(state => state.trivia.slice(indexOfFirstQuestion, indexOfLastQuestion))//cutting irrelevant questions from the page

    return (
        <div>
            {Game(page)}
         <button className="game-button-navigation" hidden={page_number === 1} onClick={() => store.dispatch(previousPage())}>previous Page</button>
        <button  className="game-button-navigation" hidden={page_number === 5} onClick={() => store.dispatch(nextPage())} >Next Page</button>

        </div>
    );
}
