import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type FetchPizzasArgs = {
  currentPage: number,
  categoryId: number,
  searchValue: string,
  sort: {
    sortProperty: string
  },
};

type PizzaItems = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[],
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItems[],
  status: Status,
}

export const fetchPizzas = createAsyncThunk<PizzaItems[], FetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage, categoryId, searchValue, sort } = params;
    const { data } = await axios.get<PizzaItems[]>(
      `https://63767267b5f0e1eb850c0eef.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sort.sortProperty.replace('-', '')}&order=${
        sort.sortProperty.includes('-') ? 'asc' : 'desc'
      }${searchValue ? `&search=${searchValue}` : ''}`
    );
    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading | success | error
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItems[]>) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
      })
  }
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
})
export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems, } = pizzaSlice.actions;
export default pizzaSlice.reducer;
