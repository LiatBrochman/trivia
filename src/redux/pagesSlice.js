import {createSlice} from "@reduxjs/toolkit";
import _ from "lodash";
import {lastPage} from "../index";

const initialState = {
    currentPage: 1,
    questionsPerPage: 5,
    indexOfFirstQuestion: 0,
    indexOfLastQuestion: 4,
    lastSelectedAnswer: 0,
    currentSelectedAnswers: [],//question that are selected [0,1,2,3,4,5...]
    allowedSubmit_byPageNum: ["emptyPage", false, false, false, false, false], //pages that allow submit (by index)
    finishedPages: [],//pages that have been submitted [0,1,2,3,4,5...]
    allowedEnd: false

}
const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        nextPage: (state) => {
            state.currentPage += 1
            state.indexOfLastQuestion = (state.currentPage * state.questionsPerPage) - 1
            state.indexOfFirstQuestion = state.indexOfLastQuestion - state.questionsPerPage + 1
        },
        previousPage: (state) => {
            state.currentPage -= 1
            state.indexOfLastQuestion = (state.currentPage * state.questionsPerPage) - 1
            state.indexOfFirstQuestion = state.indexOfLastQuestion - state.questionsPerPage + 1
        },
        startPage: (state) => {
            state.currentPage = 1
            state.indexOfLastQuestion = (state.currentPage * state.questionsPerPage) - 1
            state.indexOfFirstQuestion = state.indexOfLastQuestion - state.questionsPerPage + 1
        },
        firstTimeSelecting: (state, action) => {
            state.currentSelectedAnswers.push(action.payload)
            console.log("current question number:", action.payload)
            console.log("  const mustBeSelected = _.range(", state.indexOfFirstQuestion, ", ", state.indexOfLastQuestion + 1, ") //_.range(1, 5) ===> [1, 2, 3, 4]")

            /**
             generating arr of x numbers
             _.range(1, 5) ===> [1, 2, 3, 4]
             */
            const mustBeSelected = _.range(state.indexOfFirstQuestion, state.indexOfLastQuestion + 1)//example: [0,1,2,3,4]


            mustBeSelected.every(i => state.currentSelectedAnswers.includes(i))
                ?
                state.allowedSubmit_byPageNum[state.currentPage] = true
                :
                state.allowedSubmit_byPageNum[state.currentPage] = false

        },
        disableSubmit: (state) => {
            state.allowedSubmit_byPageNum[state.currentPage] = false
            state.finishedPages.push(state.currentPage)
        },
        disableEnd: (state) => {

            const arrayOfPages = _.range(1, lastPage + 1) // example: [1,2,3..]

            arrayOfPages.every(i => state.finishedPages.includes(i))
                ?
                state.allowedEnd = true
                :
                state.allowedEnd = false


        }

    }
})

export const {nextPage, previousPage, startPage, disableSubmit, firstTimeSelecting, disableEnd} = pagesSlice.actions
export default pagesSlice.reducer