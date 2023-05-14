import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    warranty: 0,
    total: 0,
    orderNumber: '',
    orderTotal: 0
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.warranty += action.payload.warranty;
      state.total += action.payload.warranty;
      state.total += action.payload.itemData[0].priceNum;
    },
    removeItem: (state, { payload }) => {
      const newCart = state.products.filter(
        (item) => item.itemData[0].id !== payload.id
      );
      state.products = newCart;
      state.quantity -= 1;
      if (state.products.length == 0) {
        state.quantity = 0
        state.warranty = 0 ;
        state.total = 0 ;
      } else {
        state.warranty -= payload.warranty ;
        state.total -= payload.warranty ;
        state.total -= payload.priceNum;
      }
    },
    increase: (state, { payload }) => {
      const cartItem = state.products.find(
        (item) => item.itemData[0].id === payload.id
      );
      cartItem.quantity += 1;
      state.quantity += 1;
      state.total += payload.priceNum;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.products.find(
        (item) => item.itemData[0].id === payload.id
      );
      cartItem.quantity -= 1;
      state.quantity -= 1;
      state.total -= payload.priceNum;
    },
    empty: (state) => {
      (state.products = []),
        (state.quantity = 0),
        (state.warranty = 0),
        (state.total = 0);
    },
    addOrderNum: (state, action) => {
      state.orderNumber = action.payload.orderNumber,
      state.orderTotal = action.payload.orderTotal;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { addProduct, increase, decrease, removeItem, empty, addOrderNum } =
  cartSlice.actions;
export default cartSlice.reducer;
