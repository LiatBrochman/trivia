import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: 0,
}
const gradeSlice = createSlice({
    name: 'grade',
    initialState,
    reducers: {
        increment: (state,action) => {
                state.value+=1
            }
        }
})

export const {increment} = gradeSlice.actions
export default gradeSlice.reducer