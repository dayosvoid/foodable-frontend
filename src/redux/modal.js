import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        createMealModal: false,
        updateMealModal: false  
    },
    reducers: {
        toggleCreateMealModal: (state) => { state.createMealModal = !state.createMealModal },
        toggleUpdateMealModal: (state) => { state.updateMealModal = !state.updateMealModal }
    }
})

export const { toggleCreateMealModal, toggleUpdateMealModal } = modalSlice.actions
export default modalSlice.reducer