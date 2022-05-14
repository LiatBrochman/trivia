import {configureStore} from '@reduxjs/toolkit'
import triviaReducer from "./triviaSlice";
import gradeReducer from "./gradeSlice";

export const store = configureStore({
    reducer: {
        trivia:triviaReducer,
        grade:gradeReducer
    }
})