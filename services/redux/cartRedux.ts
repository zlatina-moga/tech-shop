import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    tva: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.itemData[0].priceNum;
    },
    removeItem: (state, {payload}) => {
      state.products = state.products.filter((item) => item.itemData[0].id !== payload.id);
      state.quantity -= 1;
      state.total -= payload.priceNum;
    },
    increase: (state, {payload}) => {
      const cartItem = state.products.find((item) => item.itemData[0].id === payload.id);
      cartItem.quantity += 1;
      state.quantity += 1;
      state.total += payload.priceNum;
    },
    decrease: (state, {payload}) => {
      const cartItem = state.products.find((item) => item.itemData[0].id === payload.id);
      cartItem.quantity -= 1;
      state.quantity -= 1;
      state.total -= payload.priceNum;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
});

export const { addProduct, increase, decrease, removeItem } = cartSlice.actions;
export default cartSlice.reducer;