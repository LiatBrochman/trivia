import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {triviaSubmit} from "./redux/triviaSlice";
import {buttonClicked, increment} from "./redux/gradeSlice";
import _ from "lodash";
import {Link} from "react-router-dom";

export default function Submit(page) {

    const grade = useSelector(state => state.grade.value)
    const page_number = useSelector(state => state.pages.currentPage)
    const dispatch = useDispatch()
    // if ((page instanceof Array ) && (page[0].hasOwnProperty('question')) && (page[0].question))
    // {console.log("first question of page: ", page_number, "is : ", page[0].question.text)}


    return (

        <div className="containerButtons">
            <button className="game-button-submit"
                    onClick={() => {
                        let pageClone = _.cloneDeep(page)
                        if (pageClone instanceof Array) {

                            pageClone.map(questionElement => {

                                questionElement.possibleAnswers.map(possibleAnswer => {
                                    switch (possibleAnswer.isSelected + "|" + possibleAnswer.isCorrect) {

                                        case true + "|" + true:
                                            possibleAnswer.className = "answerCorrect"
                                            dispatch(increment())
                                            break;

                                        case true + "|" + false:
                                            possibleAnswer.className = "answerIncorrect"
                                            break;

                                        case false + "|" + false:
                                            possibleAnswer.className = "answerDisabled"
                                            break;

                                        case false + "|" + true:
                                            possibleAnswer.className = "answerCorrect"
                                            break;

                                        default:
                                            console.log("case default:", "index:", "something went wrong...");
                                            break;
                                    }

                                })

                            })

                            dispatch(triviaSubmit(pageClone))
                        } else {
                            console.log("not Array")
                        }

                    }}

            >Submit
            </button>


            <div className="end-quiz">
                <span className="grade-sentence">{`You scored ${grade}/5 correct answers`}</span>
                {/*<span className="grade-sentence">{page_number === 5 && `You scored ${grade}/5 correct answers`}</span>*/}
                <button className="game-button-end-quiz" hidden={page_number !== 5}>
                    <Link to="/end" className="link">End quiz</Link>
                </button>
            </div>


        </div>

    )
}