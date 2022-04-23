import {createSlice} from '@reduxjs/toolkit'


const initialState = [
    {
        question: {id: "", text: ""},

        possibleAnswers: [

            {id: "", text: "", isCorrect: true, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"}

        ]
    },
    {
        question: {id: "", text: ""},

        possibleAnswers: [

            {id: "", text: "", isCorrect: true, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"}

        ]
    },
    {
        question: {id: "", text: ""},

        possibleAnswers: [

            {id: "", text: "", isCorrect: true, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"}

        ]
    },
    {
        question: {id: "", text: ""},

        possibleAnswers: [

            {id: "", text: "", isCorrect: true, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"}

        ]
    },
    {
        question: {id: "", text: ""},

        possibleAnswers: [

            {id: "", text: "", isCorrect: true, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"},
            {id: "", text: "", isCorrect: false, color: "white"}

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
                const answers = [{text: action.payload[i]['correct_answer']}];
                action.payload[i]['incorrect_answers'].map(j=>answers.push({text:j}));
                state[i].possibleAnswers=answers;

            }
        }
    },

})

export const {addAll} = triviaSlice.actions

export default triviaSlice.reducer