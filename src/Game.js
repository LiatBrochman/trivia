import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateQuestionElement} from "./redux/triviaSlice";
import _ from "lodash";
import Submit from "./Submit"
import {decode} from "html-entities";
import {nextPage, previousPage} from "./redux/pagesSlice";


export default function Game() {

    const page_number = useSelector(state => state.pages.currentPage)
    const page = useSelector(state => state.trivia.slice(0,5) );


    const dispatch = useDispatch();


    const renderApp = () =>
        page.map((questionElement, questionElement_Index) => {
            let clonedQuestionElement = _.cloneDeep(questionElement)

            return (

                <div key={questionElement_Index}>

                    <h2 className="game-title">{decode(questionElement.question.text)}</h2>

                    <div>

                        {questionElement.possibleAnswers.map((possibleAnswer, index) => {

                            return (

                                <button key={index}
                                        disabled={possibleAnswer.isDisabled}
                                        onClick={() => {
                                            if (possibleAnswer.isSelected === true) return;


                                            clonedQuestionElement.possibleAnswers.forEach(clonedAnswer => {


                                                switch (clonedAnswer.id === possibleAnswer.id) {

                                                    case true:
                                                        clonedAnswer.isSelected = true
                                                        clonedAnswer.className = "answerSelected"
                                                        break;


                                                    default:
                                                        clonedAnswer.isSelected = false
                                                        clonedAnswer.className = "answer"
                                                        break;

                                                }
                                            })

                                            dispatch(updateQuestionElement({
                                                newQuestionElement: clonedQuestionElement,
                                                oldQuestionElement_Index: questionElement_Index
                                            }))
                                        }}
                                        className={possibleAnswer.className}

                                >

                                    {decode(possibleAnswer.text)}

                                </button>

                            )
                        })}

                    </div>

                    <hr className="hr-game"/>

                </div>
            )
        })


    return (<div className="containerGame">
        {renderApp(page)}
        {Submit(page)}
        <button hidden={page_number === 5} onClick={() => dispatch(nextPage())}>Next Page</button>
        <button hidden={page_number === 1} onClick={() => dispatch(previousPage())}>previous Page</button>

    </div>)
}



