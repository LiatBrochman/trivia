import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateTriviaRow} from "./redux/triviaSlice";
import _ from "lodash";
import Submit from "./Submit"
import { decode } from "html-entities";
import {nextPage,previousPage} from "./redux/pagesSlice";
import {nextButton} from "./redux/gradeSlice";



export default function Game() {

    const trivia = useSelector(state => state.trivia);
    const pages = useSelector(state => state.pages.currentPage)
    const submitButtons = useSelector(state => state.grade.submitButtons)
     // const [currentPage, setCurrentPage] = useState(1);
     const questionsPerPage = 5;
    const indexOfLastQuestion = pages * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const page = trivia.slice(indexOfFirstQuestion,indexOfLastQuestion);
     console.log(page)

    const dispatch = useDispatch();


    const renderApp = () => trivia.slice(indexOfFirstQuestion,indexOfLastQuestion).map((questionElement, rowIndex) => {
        let clonedRow = _.cloneDeep(questionElement)
console.log("trivia" + trivia)
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

                <hr className="hr-game" />

            </div>
        )
    })


    return (<div className="containerGame">
        {renderApp(trivia)}
        {Submit(trivia)}
        <button hidden={pages===5} onClick={()=>dispatch(nextPage())}>Next Page</button>
        <button hidden={pages===1} onClick={()=>dispatch(previousPage())}>previous Page</button>

    </div>)
}



