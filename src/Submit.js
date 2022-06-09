import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {triviaSubmit, updateTriviaRow} from "./redux/triviaSlice";
import {buttonClicked, hideSubmit, increment, nextButton, updateTriviaSubmit} from "./redux/gradeSlice";
import _ from "lodash";
import {Link} from "react-router-dom";
import {nextPage} from "./redux/pagesSlice";


export default function Submit(page, buttonIndex) {
    const grade = useSelector(state => state.grade.value)
    const submitButtons = useSelector(state => state.grade.submitButtons)
    //console.log(submitButtons)
    const submitButtonsSelected = useSelector(state => state.grade.submitButtons.isSelected)
    //const isHidden = useSelector(state => state.grade.isHidden)
    const pages = useSelector(state => state.pages.currentPage)
    //console.log(pages)
    const dispatch = useDispatch()
    let triviaClone = _.cloneDeep(page)
     //const submitButton = submitButtons.slice(1);
    const [isEnabled,setIsEnabled]=useState(true)

    const buttonPerPage = 1;
    const indexOfLastQuestion = pages * buttonPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - buttonPerPage;
  //  const submitButton = submitButtons.slice(indexOfFirstQuestion,indexOfLastQuestion);

    useEffect(() => {
        if(page instanceof Array){
            // checks if there is "some" answer selected on any row, if so, returns true.
            // if all the rows contains at least 1 selected answer, we enable it by setting the isDisabled to false.
            setIsEnabled(
                page.every(questionElement=>
                        !!questionElement.possibleAnswers.some(
                            possibleAnswer=> possibleAnswer.isSelected===true)))
        }
    },[page]);

    return (
        <div className="containerButtons">
            {submitButtons.slice(indexOfFirstQuestion,indexOfLastQuestion).map((button, buttonIndex) => {
                console.log("button index " + buttonIndex)
                return(

            <button  className="game-button-submit"
                     key={buttonIndex}
                     // disabled={!isEnabled}
                    //  hidden={()=> pages !== 5}

                onClick={() => {
                    // (submitButton.id === index ? submitButton.isClicked = true : submitButton.isClicked = false);
                    triviaClone instanceof Array && triviaClone.map((questionElement) => {

                        questionElement.possibleAnswers.map(possibleAnswer => {
                            switch (possibleAnswer.isSelected + "|" + possibleAnswer.isCorrect) {

                                case true + "|" + true:
                                    //console.log("index:", index, "case:", [true, true]);
                                    // console.log("possibleAnswer.isSelected:", possibleAnswer.isSelected, '|', "possibleAnswer.isCorrect:", possibleAnswer.isCorrect)
                                    possibleAnswer.className = "answerCorrect"
                                    dispatch(increment())
                                    break;

                                case true + "|" + false:
                                    // console.log("index:", index, "case:", [true, false]);
                                    // console.log("possibleAnswer.isSelected:", possibleAnswer.isSelected, '|', "possibleAnswer.isCorrect:", possibleAnswer.isCorrect)
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

                            // possibleAnswer.isDisabled = true

                        })

                    })

                   // {pages !== 5 && dispatch(hideSubmit())}

                    {pages !== 5 && dispatch(triviaSubmit(triviaClone))}
                    dispatch(buttonClicked())

                   // dispatch(nextButton())

                    //dispatch(triviaSubmit())
                    //{pages !== 5 &&  dispatch(buttonClicked())}
                    //button.isClicked = true

                }}

            >Submit
            </button>)})}
            <span>{pages !== 5 && grade}</span>
            <div className="end-quiz">
              <span className="grade-sentence">{pages === 5 && `You scored ${grade}/5 correct answers`}</span>
                  <button className="game-button-end-quiz" hidden={pages !== 5}>
                <Link to="/end" className="link">End quiz</Link>
            </button>
            </div>
        </div>

    )

}