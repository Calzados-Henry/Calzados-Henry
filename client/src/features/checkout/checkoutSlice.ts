import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CheckoutDataI, ShippingAddressI } from './checkoutModels';
// Esto es typescript

// Estado inicial que puede ser cualquier cosa
const initialState = {
  firstName: '',
  lastName: '',
  address: '',
  zip: '',
  country: '',
  state: '',
  city: '',
};

export const checkoutSlice = createSlice({
  name: 'checkout', // Optional
  initialState,
  reducers: {
    updateCheckoutInfo: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring
export const { updateCheckoutInfo } = checkoutSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default checkoutSlice.reducer;
