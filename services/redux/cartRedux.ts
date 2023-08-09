import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    warranty: 0,
    total: 0,
    orderNumber: "",
    orderTotal: 0,
    isSoftware: false,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.warranty += action.payload.warranty;
      state.total += action.payload.warranty;
      state.isSoftware = action.payload.isSoftware;
      if (state.isSoftware == true) {
        state.total += action.payload.itemData[0].priceNum;
      } else {
        state.total += action.payload.itemData[35];
      }
    },
    removeItem: (state, { payload }) => {
      let newCart = state.products
        .filter(
          (item) => "https://fancy-selkie-5f6e47.netlify.app" + item.itemData[0].id != payload.id
        )
        .filter(
          (item) => item.itemData[8] != payload.id.replace("fancy-selkie-5f6e47.netlify.app", "citgrup")
        );

      state.products = newCart;
      state.quantity -= 1;
      if (state.quantity < 0) {
        state.quantity = 0;
      }
      if (state.products.length == 0) {
        state.quantity = 0;
        state.warranty = 0;
        state.total = 0;
      } else {
        state.warranty -= payload.warranty;
        state.total -= payload.warranty;
        state.total -= payload.priceNum;
        if (state.total < 0) {
          state.total = 0;
        }
      }
    },
    increase: (state, { payload }) => {
      const cartItem = state.products.find(
        (item) => item.itemData[8] === payload.id.replace("citgrup.ro", "fancy-selkie-5f6e47.netlify.app")
      );
      cartItem.quantity += 1;
      state.quantity += 1;
      state.total += payload.priceNum;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.products.find(
        (item) => item.itemData[8] === payload.id.replace("citgrup.ro", "fancy-selkie-5f6e47.netlify.app")
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
      (state.orderNumber = action.payload.orderNumber),
        (state.orderTotal = action.payload.orderTotal);
    },
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

export const {
  addProduct,
  increase,
  decrease,
  removeItem,
  empty,
  addOrderNum,
} = cartSlice.actions;
export default cartSlice.reducer;
