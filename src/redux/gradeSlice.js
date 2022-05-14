import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: 0,
    isHidden: false,
}
const gradeSlice = createSlice({
    name: 'grade',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        hideSubmit: (state) => {
            state.isHidden = true
        },
    }
})

export const {increment,hideSubmit} = gradeSlice.actions
export default gradeSlice.reducer