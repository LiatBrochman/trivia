import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addAll, getColor, selectedAnswer} from "./redux/triviaSlice";


export default function Game() {

    const dispatch = useDispatch()

    const trivia = useSelector(state => state.trivia)

    useEffect(() => {
        axios("https://opentdb.com/api.php?amount=5").then(res => dispatch(addAll(res.data.results)))
    }, [])

    const handleClick = (possibleAnswer) => {
        dispatch(selectedAnswer(possibleAnswer));
        // setColor(possibleAnswer)
    }





    const allQuestions = trivia.map((questionElement)=> {

        return (

            <div>

                <h2 key={questionElement.id}>{questionElement.question.text}</h2>

                <div>
                    {questionElement.possibleAnswers.map((possibleAnswer) => {
                        return (

                            <button key={possibleAnswer.id} style = {{ backgroundColor : possibleAnswer.color }}
                                    onClick={() => handleClick(possibleAnswer)}

                            >{possibleAnswer.text}</button>

                        )
                    })}

                </div>

            </div>
        )
    })

    // const [colors,setColor=(possibleAnswer)=> colors.push(possibleAnswer.color)] = useState( [trivia.map(i=>i.possibleAnswers.map(j=> {j.id,j.color}))])
    // function getColorByID(id) {
    //     return colors.find(id)
    // }
    return (


        <div>
            {allQuestions}
        </div>


    )
}



