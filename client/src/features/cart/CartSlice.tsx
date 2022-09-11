import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Details } from '../../sehostypes/Product';
import { removeOneProductFromLS, setProductLocalStorage, updateQuantityLS } from '../../utils/utils';

// Esto es typescript
export interface CartI {
  idUser: number | null
  idProduct: number | undefined
  name: string | undefined
  details: Details | undefined
  price: number | undefined
  quantity: number
}

// Estado inicial que puede ser cualquier cosa
const initialState: CartI[] = [];

export const cartSlice = createSlice({
  name: 'cart', // Optional
  initialState: localStorage.getItem('product')
  ? JSON.parse(localStorage.getItem('product') as string)
  : initialState,
  // Aca van los reducers
  // Redux Toolkit nos permite escribir lógica "mutante" en reductores. Eso
  // en realidad no muta el estado porque usa la biblioteca Immer,
  // que detecta cambios en un "estado de borrador" y produce un nuevo
  // estado inmutable basado en esos cambios
  reducers: {
    addToLocalCart: (state: CartI[], action: PayloadAction<CartI>) => {
        setProductLocalStorage(action.payload)
        const newProduct = {...action.payload, idUser: 0, }
        return [...state, newProduct]
      },
    updateQuantity: (state: CartI[], action: PayloadAction<{method: string, id: number}>) => {
      const updatedProducts = updateQuantityLS(action.payload.method, action.payload.id)
      return updatedProducts
    },
    deleteFromLS: (state: CartI[], action: PayloadAction<number>) => {
      const filteredProducts = removeOneProductFromLS(action.payload)
      return filteredProducts
    },
    deleteAllfromLS: () => {
      localStorage.removeItem('product')
      return initialState
    }
    },
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring
export const { addToLocalCart, updateQuantity, deleteFromLS, deleteAllfromLS } = cartSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default cartSlice.reducer;
