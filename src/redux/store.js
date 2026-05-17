import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme";
import modalReducer from "./modal"
import foodReducer from "./food"

const store = configureStore({
  reducer: {
    theme: themeReducer,
    modal:modalReducer,
    food:foodReducer
  },
});

export default store;