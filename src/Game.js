import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateTrivia} from "./redux/triviaSlice";
import _ from "lodash";


export default function Game() {

    const trivia = useSelector(state => state.trivia);
    const dispatch = useDispatch();
     const renderApp = (state) => state.map((questionElement, rowIndex) => {

        return (

            <div key={rowIndex}>

                <h2>{questionElement.question.text}</h2>

                <div>

                    {questionElement.possibleAnswers.map((possibleAnswer, index) => {

                        return (

                            <button key={index}
                                    onClick={() => {
                                        if (possibleAnswer.isSelected === true) return;


                                        let newRow = _.cloneDeep(questionElement)

                                        newRow.possibleAnswers.forEach(answer => answer.id === possibleAnswer.id ? answer.isSelected = true : answer.isSelected = false)


                                        dispatch(updateTrivia({newRow,rowIndex}))

                                    }


                                    }
                                    className={possibleAnswer.isSelected ? 'answerSelected' : 'answer'}>

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
    </>)
}



