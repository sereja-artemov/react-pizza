import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortProperty(state, action) {
      state.sort.sortProperty = action.payload;
    },
    setSortName(state, action) {
      state.sort.name = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    }
  }
})
export const selectSort = (state) => state.filter.sort;
export const selectFilter = (state) => state.filter;
export const { setCategoryId, setSortProperty, setCurrentPage,setSortName, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
