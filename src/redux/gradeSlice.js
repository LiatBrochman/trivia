import {createSlice} from "@reduxjs/toolkit";
import {isDisabled} from "@testing-library/user-event/dist/utils";

const initialState = {
    value: 0,
    isHidden: false,
    isDisabled:true,
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