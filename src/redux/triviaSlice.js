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
        selectAnswer: (state, action) => {

            console.log(action.payload.getParent())

            action.payload.color === "white" && (
                // action.payload.getParent().find(answer => )

                state.map((questionElement) => {
                    questionElement.possibleAnswers.map(possibleAnswer => {


                        // (possibleAnswer.id === action.payload ? possibleAnswer.color = "blue" : possibleAnswer.color = "white");

                    })
                })

            )


        },
        getColor: (state, action) => {
            console.log(":::", state.map(i => i.possibleAnswers.find(action.payload)))

            const x = state.map(i => i.possibleAnswers.find(j => action.payload === j.id))
            return x.color
        }
    }

})

export const {addAll, selectAnswer, getColor} = triviaSlice.actions

export default triviaSlice.reducer