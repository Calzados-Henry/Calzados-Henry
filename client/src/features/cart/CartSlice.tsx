import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProductI, ProductPartial } from '../../sehostypes/Product';
import { useAuth } from '../../hooks/useAuth';
import { getProductsLocalStorage } from '../../utils/utils';
const localCart = getProductsLocalStorage()

// Esto es typescript
export interface CartI {
  idUser: number
  details: ProductPartial
  idSize: number
  idColor: number
  quantity: number
}

// Estado inicial que puede ser cualquier cosa
const initialState: CartI[] = [];

export const cartSlice = createSlice({
  name: 'cart', // Optional
  initialState,
  // Aca van los reducers
  // Redux Toolkit nos permite escribir lógica "mutante" en reductores. Eso
  // en realidad no muta el estado porque usa la biblioteca Immer,
  // que detecta cambios en un "estado de borrador" y produce un nuevo
  // estado inmutable basado en esos cambios
  reducers: {
    addToCart: (state, action) => {

      }
    },
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring
export const { addToCart } = cartSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default cartSlice.reducer;
