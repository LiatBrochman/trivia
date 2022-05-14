import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateTrivia} from "./redux/triviaSlice";
import _ from "lodash";
import Submit from "./Submit"


export default function Game() {

    const trivia = useSelector(state => state.trivia);
    const dispatch = useDispatch();
    const [enableSubmit,setEnableSubmit]=useState(false)

    const renderApp = (state) => state.map((questionElement, rowIndex) => {

        return (

            <div key={rowIndex}>

                <h2>{questionElement.question.text}</h2>

                <div>

                    {questionElement.possibleAnswers.map((possibleAnswer, index) => {

                        return (

                            <button key={index}
                                   disabled={possibleAnswer.isDisabled}
                                    onClick={() => {
                                        if (possibleAnswer.isSelected === true) return;


                                        let clonedRow = _.cloneDeep(questionElement)

                                        clonedRow.possibleAnswers.forEach(clonedAnswer => {


                                            switch (clonedAnswer.id === possibleAnswer.id){

                                                case true:
                                                    clonedAnswer.isSelected = true
                                                    clonedAnswer.className="answerSelected"
                                                    break;


                                                default:
                                                    clonedAnswer.isSelected = false
                                                    clonedAnswer.className="answer"
                                                break;

                                            }

                                        })

                                        dispatch(updateTrivia({newRow: clonedRow,rowIndex}))
                                    }


                                    }
                                    // className={possibleAnswer.isSelected === true ? 'answerSelected' : 'answer'}
                                    className={possibleAnswer.className}





                            >

                                {possibleAnswer.text}

                            </button>

                        )
                    })}

                </div>

            </div>
        )
    });


    return (<>
        {renderApp(trivia)}
        {Submit(trivia)}
    </>)
}



