import '../../CSS/PagesCSS/Pages.css';
import React from 'react';
import {useSelector} from "react-redux";
import Game from "./Game";
import {nextPage, previousPage} from "../../redux/Slices/pagesSlice";
import {store} from "../../redux/Store/store";
import {lastPage} from "../../index"

export default function Pages() {

    const pages = useSelector(state => state.pages)

    let page = useSelector(state => state.trivia.slice(pages.indexOfFirstQuestion, pages.indexOfLastQuestion+1))//cutting irrelevant questions from the page

    return (
        <div className="pages-container">
            {Game(page)}
            <button className="game-button-navigation" hidden={pages.currentPage === 1}
                    onClick={() => store.dispatch(previousPage())}>previous Page
            </button>
            <button className="game-button-navigation" hidden={pages.currentPage === lastPage}
                    onClick={() => store.dispatch(nextPage())}>Next Page
            </button>
<br/>
        </div>
    );
}


