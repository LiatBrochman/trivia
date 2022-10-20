import React from 'react';
import {updateQuestionElement} from "../../redux/Slices/triviaSlice";
import {firstTimeSelecting} from "../../redux/Slices/pagesSlice"
import _ from "lodash";
import SubmitButton from "../Buttons/SubmitButton"
import {decode} from "html-entities";
import {store} from "../../redux/Store/store";
import '../../CSS/PagesCSS/Game.css';

export default function Game(page) {

    const renderApp = () => page instanceof Array && page[1] && page.map(questionElement => {

        let clonedQuestionElement = _.cloneDeep(questionElement)

        return (

            <div className="questionElement" key={questionElement.question.number}>

                <h2 className="game-title">{decode(questionElement.question.text)}</h2>

                <div>

                    {clonedQuestionElement.possibleAnswers.map(c_possibleAnswer => {

                        return (
                            <div>
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
                                        if(clonedQuestionElement.rowIsSelected===false) store.dispatch(firstTimeSelecting(clonedQuestionElement.question.number))
                                        clonedQuestionElement.rowIsSelected = true;
                                        store.dispatch(updateQuestionElement(clonedQuestionElement));
                                    }

                                    }
                                    className={c_possibleAnswer.className}
                            >

                                {decode(c_possibleAnswer.text)}

                            </button>
                            </div>

                        )
                    })}

                </div>



            </div>
        )
    })


    return (<div className="containerGame">
        {renderApp(page)}



    </div>)
}



