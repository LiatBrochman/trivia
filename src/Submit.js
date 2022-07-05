import React from 'react';
import {useSelector} from "react-redux";
import {triviaSubmit} from "./redux/triviaSlice";
import {increment} from "./redux/gradeSlice";
import {disableEnd, disableSubmit} from "./redux/pagesSlice"
import _ from "lodash";
import {store} from "./redux/store";
import EndButton from "./EndButton";


export default function Submit(page) {

    const page_number = useSelector(state => state.pages.currentPage)
    const isDisabled = useSelector(state => !state.pages.allowedSubmit_byPageNum[page_number])

    if (isDisabled === false) console.log("you are allowed to submit now!")

    return (
            <>
            <button className="game-button-submit"
                    disabled={isDisabled}
                    onClick={() => {
                        let pageClone = _.cloneDeep(page)
                        console.log(pageClone)
                        if (pageClone instanceof Array) {

                            pageClone.map(questionElement => {

                                questionElement.possibleAnswers.map(possibleAnswer => {
                                    switch (possibleAnswer.isSelected + "|" + possibleAnswer.isCorrect) {

                                        case true + "|" + true:
                                            possibleAnswer.className = "answerCorrect"
                                            store.dispatch(increment())
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

                            store.dispatch(triviaSubmit(pageClone))
                            store.dispatch(disableSubmit())
                            store.dispatch(disableEnd())

                        } else {
                            console.log("not Array")
                        }

                    }}

            >Submit
            </button>

                <EndButton/>
        </>

    )
}