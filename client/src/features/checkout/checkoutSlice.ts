import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CheckoutDataI, ShippingAddressI } from './checkoutModels';
// Esto es typescript

// Estado inicial que puede ser cualquier cosa
const initialState = {
  check: true,
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
  stepThree: {},
};

export const checkoutSlice = createSlice({
  name: 'checkout', // Optional
  initialState,
  reducers: {
    setStepOneInfo: (state, action) => {
      state.stepOne = action.payload;
      state.check = true;
    },
    setDelivery: state => {
      console.log(state);
    },
    resetCheck: state => {
      state.check = false;
    },
  },
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring
export const { setStepOneInfo, setDelivery, resetCheck } = checkoutSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default checkoutSlice.reducer;
