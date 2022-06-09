import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
    lastSelectedAnswer:0
}
const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        nextPage: (state) => {
            state.currentPage += 1
        },
        previousPage: (state) => {
            state.currentPage -= 1
        },
        startPage: (state) => {
            state.currentPage = 1
        },
    }
})

export const {nextPage,previousPage, startPage} = pagesSlice.actions
export default pagesSlice.reducer