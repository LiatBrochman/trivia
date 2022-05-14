import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {submit} from "./redux/triviaSlice";
import {increment,hideSubmit} from "./redux/gradeSlice";
import _ from "lodash";

export default function Submit(trivia) {
    const grade = useSelector(state => state.grade.value)
    const isHidden = useSelector(state => state.grade.isHidden)
    const dispatch = useDispatch()
    let triviaClone = _.cloneDeep(trivia)

    const [isDisabled,setIsDisabled]=useState(true)

    useEffect(() => {
        // Update the document title using the browser API
        if(trivia instanceof Array){

            // checks if there is "some" answer selected on any row, if so, returns true.
            // if all the rows contains at least 1 selected answer, we enable it by setting the isDisabled to false.
            setIsDisabled(!trivia.every(questionElement=>!!questionElement.possibleAnswers.some( possibleAnswer=>possibleAnswer.isSelected===true)))
        }
    },[trivia]);

    return (
        <div>

            <button
                disabled={isDisabled}
                hidden={isHidden}
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
                    dispatch(hideSubmit())
                    dispatch(submit(triviaClone))
                }}

            >Submit
            </button>
            <span>{isHidden && grade}</span>
        </div>

    )

}