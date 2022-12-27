import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage, categoryId, searchValue, sort } = params;
    const { data } = await axios.get(
      `https://63767267b5f0e1eb850c0eef.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sort.sortProperty.replace('-', '')}&order=${
        sort.sortProperty.includes('-') ? 'asc' : 'desc'
      }${searchValue ? `&search=${searchValue}` : ''}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading', //loading | success | error
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
})

export const { setItems, } = pizzaSlice.actions;
export default pizzaSlice.reducer;
