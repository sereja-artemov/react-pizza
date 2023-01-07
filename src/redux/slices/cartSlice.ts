import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../store';
import {calcTotalPrice} from "../../utils/calcTotalPrice";

export type CartItemType = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  count: number,
  types: string,
  sizes: number,
};

interface CartSliceState {
  totalPrice: number,
  items: CartItemType[],
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  }
})
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((item) => item.id === id);
export const selectCartData = (state: RootState) => state.cart;
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
