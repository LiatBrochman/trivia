import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {submit, updateTrivia} from "./redux/triviaSlice";
import {isDisabled} from "@testing-library/user-event/dist/utils";
import _ from "lodash";
import {increment} from "./redux/gradeSlice";

export default function Submit(trivia) {
    const grade = useSelector(state => state.grade.value)
    const dispatch = useDispatch();
    const [isDisabled, setIsDisabled] = useState(false);

    let triviaClone = _.cloneDeep(trivia)


    return (
        <div>

            <button
                disabled={isDisabled}
                onClick={() => {

                    triviaClone instanceof Array && triviaClone.map((questionElement, index) => {

                        questionElement.possibleAnswers.map(possibleAnswer => {
                            switch (possibleAnswer.isSelected + "|" + possibleAnswer.isCorrect) {

                                case true + "|" + true:
                                    console.log("index:", index, "case:", [true, true]);
                                    console.log("possibleAnswer.isSelected:", possibleAnswer.isSelected, '|', "possibleAnswer.isCorrect:", possibleAnswer.isCorrect)
                                    possibleAnswer.className = "answerCorrect"
                                    dispatch(increment())
                                    break;

                                case true + "|" + false:
                                    console.log("index:", index, "case:", [true, false]);
                                    console.log("possibleAnswer.isSelected:", possibleAnswer.isSelected, '|', "possibleAnswer.isCorrect:", possibleAnswer.isCorrect)
                                    possibleAnswer.className = "answerIncorrect"
                                    break;

                                case false + "|" + false:
                                    console.log("index:", index, "case:", [false, false],"??? Unknown answer");

                                    break;

                                case false + "|" + true:
                                    possibleAnswer.className = "answerCorrect"
                                    break;

                                default:
                                    console.log("case default:","index:", index,"something went wrong...");
                                    break;
                            }

                            possibleAnswer.isDisabled = true
                        })

                    })
                    console.log(triviaClone)
                    setIsDisabled(true)
                    dispatch(submit(triviaClone))
                }}

            >Submit
            </button>
            <span>{isDisabled && grade}</span>
        </div>

    )

}