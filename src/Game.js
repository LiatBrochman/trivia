import React, {useEffect} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addAll} from "./redux/triviaSlice";

function Game() {

    const dispatch = useDispatch()

    const trivia = useSelector(state=>state.trivia)

    useEffect(() => {
        axios("https://opentdb.com/api.php?amount=5")
            .then(res => {
                dispatch(addAll(res.data.results))
            })

    }, [])

    const allQuestions = trivia.map( questionElement => {

        return (

            <div>

                <h2>{ questionElement.question.text } </h2>

                <ul>
                    { questionElement.possibleAnswers.map(answer=>{
                        return (
                        <li>
                            {answer.text}
                        </li>
                        )
                    })}

                </ul>

            </div>
    )
    })


    return (


        <div>
            {allQuestions}
        </div>


    )
}

export default Game;