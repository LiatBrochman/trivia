import './Pages.css';
import React from 'react';
import {useSelector} from "react-redux";
import Game from "./Game";
import {nextPage, previousPage} from "./redux/pagesSlice";
import {store} from "./redux/store";


export default function Pages() {

    // let trying = store.getState().trivia
    // if (trying instanceof Array && trying.length === 0) store.dispatch(initPage())// if index.js didnt work

    const pages = useSelector(state => state.pages)

    // console.log("page = useSelector(state => state.trivia.slice(",pages.indexOfFirstQuestion,", ",pages.indexOfLastQuestion+1,"))//cutting irrelevant questions from the page")

    let page = useSelector(state => state.trivia.slice(pages.indexOfFirstQuestion, pages.indexOfLastQuestion+1))//cutting irrelevant questions from the page

    // useEffect(() => {
    //     page.every(questionElement => questionElement.possibleAnswers.some(answer => !!answer.isSelected))
    //         ?
    //         store.dispatch(allowSubmit())
    //         :
    //         console.log("submit isn't allowed yet")
    // }, [page])

    return (
        <div>
            {Game(page)}

            <button className="game-button-navigation" hidden={pages.currentPage === 1}
                    onClick={() => store.dispatch(previousPage())}>previous Page
            </button>
            <button className="game-button-navigation" hidden={pages.currentPage === 5}
                    onClick={() => store.dispatch(nextPage())}>Next Page
            </button>

        </div>
    );
}


