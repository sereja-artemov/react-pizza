import { configureStore } from '@reduxjs/toolkit'
import { setSearchValue } from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    setSearchValue,
  },
})
