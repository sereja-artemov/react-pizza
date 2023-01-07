import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { FilterSliceState } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortProperty(state, action: PayloadAction<'rating' | 'title' | 'price' | '-rating' | '-title' | '-price'>) {
      state.sort.sortProperty = action.payload;
    },
    setSortName(state, action: PayloadAction<string>) {
      state.sort.name = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    }
  }
})

export const {
  setCategoryId,
  setSortProperty,
  setCurrentPage,
  setSortName,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
