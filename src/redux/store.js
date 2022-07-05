import {configureStore} from '@reduxjs/toolkit'
import triviaReducer from "./triviaSlice";
import gradeReducer from "./gradeSlice";
import pagesReducer from "./pagesSlice";

export const store = configureStore({
    reducer: {
        trivia: triviaReducer,
        grade: gradeReducer,
        pages: pagesReducer
    }
})