import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CheckoutDataI, ShippingAddressI } from './checkoutModels';
import { store } from '@/store';
// Esto es typescript

// Estado inicial que puede ser cualquier cosa
const initialState = {
  check: false,
  stepOne: {
    firstName: '',
    lastName: '',
    address: '',
    zip: '',
    country: '',
    state: '',
    city: '',
  },
  delivery: {
    type: '',
    price: 0,
    message: '',
  },
  totalCart: 0,
};

export const checkoutSlice = createSlice({
  name: 'checkout', // Optional
  initialState,
  reducers: {
    setStepOneInfo: (state, action) => {
      state.stepOne = action.payload;
      state.check = true;
    },
    setDelivery: (state, action) => {
      state.delivery = action.payload;
      state.check = true;
    },
    resetCheck: state => {
      state.check = false;
    },
    setTotalCart: (state, action) => {
      state.totalCart = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring
export const { setStepOneInfo, setDelivery, resetCheck, setTotalCart } = checkoutSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default checkoutSlice.reducer;
