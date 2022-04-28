import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addAll, selectAnswer} from "./redux/triviaSlice";


export default function Game() {


    const dispatch = useDispatch()

    const trivia = useSelector(state => state.trivia)

    const [allQuestions, setAllQuestions] = useState([])

    function renderAllQuestions() {

        trivia instanceof Array && setAllQuestions(trivia.map((questionElement, index) => {

            return (

                <div key={index}>

                    <h2>{questionElement.question.text}</h2>

                    <div>

                        {questionElement.possibleAnswers.map((possibleAnswer, index) => {

                            return (

                                <button key={index} onClick={() => dispatch(selectAnswer(possibleAnswer))}
                                        style={{backgroundColor: possibleAnswer.color}}>

                                    {possibleAnswer.text}

                                </button>

                            )
                        })}

                    </div>

                </div>
            )
        }))
    }

    useEffect(() => {
        axios("https://opentdb.com/api.php?amount=5")
            .then(res => dispatch(addAll(res.data.results)))
    }, [])

    useEffect(()=>{

        renderAllQuestions()

    // },[!!trivia])

    },[!!trivia && trivia instanceof Array && trivia[0] && trivia[0].possibleAnswers && trivia[0].possibleAnswers.length > 0 ])

    return (

        <div>
            {allQuestions}
        </div>


    )
}



