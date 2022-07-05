import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {nanoid} from 'nanoid'
import axios from "axios";
import React from "react";
import '../Game.css';

const DEFAULT_AMOUNT_OF_QUESTIONS = 25;
export const initPage = createAsyncThunk('trivia/initPage', async (data = {amountOfQuestions: DEFAULT_AMOUNT_OF_QUESTIONS}, {rejectWithValue}) => {



    try {
        return axios(`https://opentdb.com/api.php?amount=${data.amountOfQuestions}`).then(res => res.data.results)

    } catch (e) {
        console.error(e)
        return rejectWithValue(0)
    }
})
const initialState = [
    // {
    //     page: 1,
    //     trivia:
    // }, {
    //     page: 2,
    //     trivia:
    // }, {
    //     page: 3,
    //     trivia:
    // }
]
const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

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
        updateQuestionElement: (state, action) => {
            // console.log(action.payload)
            // console.log(action.payload.question.number)
            state[action.payload.question.number] = action.payload

        },
        triviaSubmit: (state, action) => {

            console.log("action payload ", action.payload)
            action.payload.map(questionElement => {
                state[questionElement.question.number] = questionElement
            })

        },
    },
    extraReducers: {

        [initPage.fulfilled]: (state, action) => {

            const amountOfQuestions = action.payload.length

            for (let i = 0; i < amountOfQuestions; i++) {
                state[i] = {}
                //state[i].numberPage = j+1
                state[i].question = {}
                state[i].question.text = action.payload[i].question;
                state[i].question.id = nanoid();
                state[i].question.number = i
                let answers = [{
                    text: action.payload[i]['correct_answer'],
                    id: nanoid(),
                    isSelected: false,
                    isCorrect: true,
                    isDisabled: false,
                    className: 'answer'
                }]
                action.payload[i]['incorrect_answers'].map(k => answers.push({
                    text: k,
                    id: nanoid(),
                    isSelected: false,
                    isCorrect: false,
                    isDisabled: false,
                    className: 'answer'
                }))

                answers = shuffle(answers)

                state[i].possibleAnswers = []
                state[i].rowIsSelected= false;
                answers.every(ans => state[i].possibleAnswers.push(ans))
            }
        }

    }


})


export const {updateQuestionElement, triviaSubmit} = triviaSlice.actions

export default triviaSlice.reducer