import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateQuestionElement} from "./redux/triviaSlice";
import _ from "lodash";
import Submit from "./Submit"
import {decode} from "html-entities";
import {nextPage, previousPage} from "./redux/pagesSlice";


export default function Game() {
    const page_number = useSelector(state => state.pages.currentPage)
    const questionsPerPage = 5;
    const indexOfLastQuestion = page_number * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const page = useSelector(state => state.trivia.slice(indexOfFirstQuestion, indexOfLastQuestion))
    let clonedQuestionElement;

    const dispatch = useDispatch();


    const renderApp = () => page.map(questionElement => {

        clonedQuestionElement = _.cloneDeep(questionElement)
        if(questionElement.question.number !== clonedQuestionElement.question.number) console.log("beginning",questionElement.question.number, clonedQuestionElement.question.number)

        return (

            <div key={questionElement.question.number}>

                <h2 className="game-title">{decode(questionElement.question.text)}</h2>

                <div>

                    {questionElement.possibleAnswers.map((possibleAnswer, possibleAnswer_index) => {

                        return (
                            <button key={possibleAnswer_index}
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
                                        if(questionElement.question.number !== clonedQuestionElement.question.number) console.log("onclick",questionElement.question.number, clonedQuestionElement.question.number)

                                        // console.log(questionElement.question.number)
                                        // console.log(clonedQuestionElement.question.number)
                                        dispatch(updateQuestionElement(clonedQuestionElement))

                                    }

                                    }
                                    className={possibleAnswer.className}

                            >

                                {decode(possibleAnswer.text)}
                                {(questionElement.question.number !== clonedQuestionElement.question.number) && console.log("after dispatch",questionElement.question.number, clonedQuestionElement.question.number)}


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



