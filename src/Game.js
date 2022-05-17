import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateTriviaRow} from "./redux/triviaSlice";
import _ from "lodash";
import Submit from "./Submit"
import { decode } from "html-entities";
import {Link} from "react-router-dom";


export default function Game() {

    const trivia = useSelector(state => state.trivia);



    const dispatch = useDispatch();

    const renderApp = (state) => state.map((questionElement, rowIndex) => {
        let clonedRow = _.cloneDeep(questionElement)

        return (

            <div key={rowIndex}>

                <h2 className="game-title">{decode(questionElement.question.text)}</h2>

                <div>

                    {questionElement.possibleAnswers.map((possibleAnswer, index) => {

                        return (

                            <button key={index}
                                    disabled={possibleAnswer.isDisabled}
                                    onClick={() => {
                                        if (possibleAnswer.isSelected === true) return;


                                        clonedRow.possibleAnswers.forEach(clonedAnswer => {


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

                                        dispatch(updateTriviaRow({newRow: clonedRow, rowIndex}))
                                    }}
                                    className={possibleAnswer.className}
                            >

                                {decode(possibleAnswer.text)}

                            </button>

                        )
                    })}

                </div>

            </div>
        )
    })


    return (<>
        {renderApp(trivia)}
        {Submit(trivia)}
        <Link to="/end">End quiz</Link>
    </>)
}



