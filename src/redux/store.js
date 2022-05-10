import {configureStore} from '@reduxjs/toolkit'
import triviaReducer from "./triviaSlice";

export const store = configureStore({
    reducer: {
        trivia:triviaReducer
    },
})