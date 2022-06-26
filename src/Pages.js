import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Game from "./Game";
import {nextPage, previousPage} from "./redux/pagesSlice";

export default function Pages() {
    const questionsPerPage = 5;
    let page_number = useSelector(state => state.pages.currentPage)
    const indexOfLastQuestion = page_number * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const dispatch = useDispatch();
    let page = useSelector(state => state.trivia.slice(indexOfFirstQuestion, indexOfLastQuestion))

    return (
        <div>
            {page instanceof Array && page[0] && page[1] && Game(page)}
            <button hidden={page_number === 5} onClick={() => dispatch(nextPage())}>Next Page</button>
            <button hidden={page_number === 1} onClick={() => dispatch(previousPage())}>previous Page</button>
        </div>
    );
}
