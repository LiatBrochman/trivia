import React from 'react';
import {updateQuestionElement} from "./redux/triviaSlice";
import _ from "lodash";
import Submit from "./Submit"
import {decode} from "html-entities";
import {store} from "./redux/store";

export default function Game(page) {

    const buttons = [1, 2, 3, 4, 5];
    const renderApp = () => page instanceof Array && page[1] && page.map(questionElement => {

        let clonedQuestionElement = _.cloneDeep(questionElement)

        return (

            <div key={questionElement.question.number}>

                <h2 className="game-title">{decode(questionElement.question.text)}</h2>

                <div>

                    {clonedQuestionElement.possibleAnswers.map(c_possibleAnswer => {

                        return (
                            <button key={c_possibleAnswer.id}
                                    disabled={c_possibleAnswer.isDisabled}

                                    onClick={() => {

                                        if (c_possibleAnswer.isSelected === true) return;

                                        c_possibleAnswer.isSelected = true;
                                        c_possibleAnswer.className = "answerSelected";
                                        let others = clonedQuestionElement.possibleAnswers.filter(i => i.id !== c_possibleAnswer.id)
                                        others.forEach(i => {
                                            i.isSelected = false;
                                            i.className = "answer";
                                        })
                                        store.dispatch(updateQuestionElement(clonedQuestionElement));
                                    }

                                    }
                                    className={c_possibleAnswer.className}
                            >

                                {decode(c_possibleAnswer.text)}

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


    </div>)
}



