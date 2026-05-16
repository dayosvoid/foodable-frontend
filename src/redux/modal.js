import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        createMealModal:false
    },
    reducers:{
        toggleCreateMealModal :(state)=>{ state.createMealModal = !state.createMealModal }
    }

}) 
export const {toggleCreateMealModal} = modalSlice.actions
export default modalSlice.reducer