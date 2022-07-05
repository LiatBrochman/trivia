import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: 0,
    submitButtons: [
        {id: 0, isClicked: false},
        {id: 1, isClicked: false},
        {id: 2, isClicked: false},
        {id: 3, isClicked: false},
        {id: 4, isClicked: false},
    ]
}
const gradeSlice = createSlice({
    name: 'grade',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        // hideSubmit: (state) => {
        //     state.isHidden = true
        //     state.isDisabled = true
        // },
        initialGrade: (state) => {
            state.value = 0;
            for (let i = 0; i < 5; i++) {
                state.submitButtons[i].id = i;
                state.submitButtons[i].isClicked = false;
            }
        },
        buttonClicked: (state) => {
            state.submitButtons[0].isClicked = true
        }
    },

},)

export const {increment, initialGrade, buttonClicked} = gradeSlice.actions
export default gradeSlice.reducer