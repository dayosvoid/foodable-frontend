import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme";
import modalReducer from "./modal"

const store = configureStore({
  reducer: {
    theme: themeReducer,
    modal:modalReducer
  },
});

export default store;