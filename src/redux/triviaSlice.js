import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {nanoid} from 'nanoid'
import axios from "axios";
import React from "react";
import _ from "lodash";
import '../Game.css';

export const addAll_Thunk = createAsyncThunk(
    'trivia/addAll_Thunk', async () => {
        return axios("https://opentdb.com/api.php?amount=5").then(res => res.data.results)
    })


const initialState = [
    {
        question: {},

        possibleAnswers: [

            // {id: "", key:"", text: "", isCorrect: true, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false}

        ]
    },
    {
        question: {},

        possibleAnswers: [

            // {id: "", key:"", text: "", isCorrect: true, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false}

        ]
    },
    {
        question: {},

        possibleAnswers: [

            // {id: "", key:"", text: "", isCorrect: true, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false}

        ]
    },
    {
        question: {},

        possibleAnswers: [

            // {id: "", key:"", text: "", isCorrect: true, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false}

        ]
    },
    {
        question: {},

        possibleAnswers: [

            // {id: "", key:"", text: "", isCorrect: true, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false},
            // {id: "", key:"", text: "", isCorrect: false, color: "white", isSelected: false}

        ]
    }
]


export const triviaSlice = createSlice({
    name: 'trivia',
    initialState,
    reducers: {
        addAll: (state, action) => {

            const amountOfQuestions = action.payload.length;

            for (let i = 0; i < amountOfQuestions; i++) {
                state[i].question.text = action.payload[i].question;
                state[i].question.id = nanoid();
                const answers = [{
                    text: action.payload[i]['correct_answer'],
                    id: nanoid(),
                    isSelected: false,
                    color: "white"
                }];
                action.payload[i]['incorrect_answers'].map(j => answers.push({
                    text: j,
                    id: nanoid(),
                    isSelected: false,
                    color: "white"
                }));
                state[i].possibleAnswers = answers;
            }

        },
        updateTrivia: (state, action) => {
            console.log(action.payload)
            state[action.payload.rowIndex] = action.payload.newRow

        },

    },
    extraReducers: {

        [addAll_Thunk.fulfilled]: (state, action) => {

            const amountOfQuestions = action.payload.length;

            for (let i = 0; i < amountOfQuestions; i++) {
                state[i].question.text = action.payload[i].question;
                state[i].question.id = nanoid();
                const answers = [{
                    text: action.payload[i]['correct_answer'],
                    id: nanoid(),
                    isSelected: false
                }];
                action.payload[i]['incorrect_answers'].map(j => answers.push({
                    text: j,
                    id: nanoid(),
                    isSelected: false
                }));
                state[i].possibleAnswers = answers;
            }
        }
    }
})

export const renderApp = (state,dispatch) => state.map((questionElement, rowIndex) => {
    return (

        <div key={rowIndex}>

            <h2>{questionElement.question.text}</h2>

            <div>

                {questionElement.possibleAnswers.map((possibleAnswer, index) => {

                    return (

                        <button key={index}
                                onClick={() => {
                                    if (possibleAnswer.isSelected === true) return;


                                    let newRow = _.cloneDeep(questionElement)
                                    // newRow.possibleAnswers.forEach(i=>i.isSelected=false);
                                    // newRow.isSelected = true;

                                    newRow.possibleAnswers.forEach(answer => answer.id === possibleAnswer.id ? answer.isSelected = true : answer.isSelected = false)


                                    dispatch(updateTrivia({newRow,rowIndex}))

                                }


                                }
                                className={possibleAnswer.isSelected ? 'answerSelected' : 'answer'}>

                            {possibleAnswer.text}

                        </button>

                    )
                })}

            </div>

        </div>
    )
})


export const {addAll, updateTrivia} = triviaSlice.actions

export default triviaSlice.reducer