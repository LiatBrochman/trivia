import {createSlice} from '@reduxjs/toolkit'
import {nanoid} from 'nanoid'


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
                console.log("state[i]", state[i])

                state[i].question.text = action.payload[i].question;
                state[i].question.id = nanoid();

                const answers = [{
                    text: action.payload[i].correct_answer,
                    id: nanoid(),
                    isSelected: false,
                    color: "white"
                }];
                action.payload[i].incorrect_answers.map(answerText => answers.push({
                    text: answerText,
                    id: nanoid(),
                    isSelected: false,
                    color: "white"
                }));
                state[i].possibleAnswers = answers;
            }
        },


        selectAnswer: (state, action) => {

            console.log("trying to click")

            if (action.payload.isSelected === false) {

                let row = state.find(i => {
                    console.log("possibleAnswers:",i.possibleAnswers)
                   return (i.possibleAnswers.includes(action.payload)) && i
                })

                console.log("row:",row)

                row.possibleAnswers.map(i => i.isSelected = false)
                row.possibleAnswers.find(action.payload).isSelected = true

                // state = [
                //     ...state,
                //     row]
                state.push(row)
            }

        },
    }

})

export const {addAll, selectAnswer} = triviaSlice.actions

export default triviaSlice.reducer