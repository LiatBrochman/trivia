import {configureStore} from '@reduxjs/toolkit'
import triviaReducer from "../Slices/triviaSlice";
import gradeReducer from "../Slices/gradeSlice";
import pagesReducer from "../Slices/pagesSlice";

export const store = configureStore({
    reducer: {
        trivia: triviaReducer,
        grade: gradeReducer,
        pages: pagesReducer
    }
})