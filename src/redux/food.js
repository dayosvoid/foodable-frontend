import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
    name:"food",
    initialState:{
        allFood:[]
    },
    reducers:{
        updateAllFood:(state,action)=>{state.allFood = action.payload},
       removeFood: (state, action) => { state.allFood = state.allFood.filter(food => food._id !== action.payload) }
    }
})

export const {updateAllFood,removeFood}  = foodSlice.actions
export default foodSlice.reducer