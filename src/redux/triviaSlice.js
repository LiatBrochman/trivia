import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {nanoid} from 'nanoid'
import axios from "axios";
import React from "react";
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

        ],
    }
]
const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
const triviaSlice = createSlice({
    name: 'trivia',
    initialState,
    reducers: {
        updateTrivia: (state, action) => {
            state[action.payload.rowIndex] = action.payload.newRow
        },
        submit: (state, action) => {

            action.payload.map((questionElement, index) => {
                state[index] = questionElement
            })
        },
    },
    extraReducers: {
        [addAll_Thunk.fulfilled]: (state, action) => {

            const amountOfQuestions = action.payload.length;

            for (let i = 0; i < amountOfQuestions; i++) {
                state[i].question.text = action.payload[i].question;
                state[i].question.id = nanoid();
                let answers = [{
                    text: action.payload[i]['correct_answer'],
                    id: nanoid(),
                    isSelected: false,
                    isCorrect: true,
                    isDisabled: false,
                    className: 'answer'
                }];
                action.payload[i]['incorrect_answers'].map(j => answers.push({
                    text: j,
                    id: nanoid(),
                    isSelected: false,
                    isCorrect: false,
                    isDisabled: false,
                    className: 'answer'
                }));

                answers = shuffle(answers);
                state[i].possibleAnswers = answers;
            }
        },
    }
})


export const {updateTrivia, submit} = triviaSlice.actions

export default triviaSlice.reducer