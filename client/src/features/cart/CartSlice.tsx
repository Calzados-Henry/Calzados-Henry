import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Details } from '../../sehostypes/Product';
import { removeOneProductFromLS, setProductLocalStorage, updateQuantityLS } from '../../utils/utils';
import axios from 'axios';

// Esto es typescript
export interface UserSizeI {
  size: string | undefined
  stock: number | undefined
}

export interface CartI {
  idUser: number | null
  idProduct: number | undefined
  image: string | undefined
  name: string | undefined
  color: string | undefined
  size: UserSizeI[] | undefined
  price: number | undefined 
  quantity: number
}


export interface State {
  loading: boolean
  products: CartI[]
  error: string
  complete: boolean
}
// Estado inicial que puede ser cualquier cosa
const initialState: State = {
  loading: false,
  products: localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product') as string) : [],
  error: '',
  complete: false
}

export const cartSlice = createSlice({
  name: 'cart', // Optional
  initialState,
  // Aca van los reducers
  // Redux Toolkit nos permite escribir lógica "mutante" en reductores. Eso
  // en realidad no muta el estado porque usa la biblioteca Immer,
  // que detecta cambios en un "estado de borrador" y produce un nuevo
  // estado inmutable basado en esos cambios
  reducers: {
    addToLocalCart: (state: State, action: PayloadAction<CartI>) => {
        setProductLocalStorage(action.payload)
        const newProduct = [...state.products, action.payload]
        return {...state, products: newProduct}
      },
    updateQuantity: (state: State, action: PayloadAction<{method: string, id: number}>) => {
      const updatedProducts = updateQuantityLS(action.payload.method, action.payload.id)
      return {...state, products:updatedProducts}
    },
    deleteFromLS: (state: State, action: PayloadAction<number>) => {
      const filteredProducts = removeOneProductFromLS(action.payload)
      return {...state, products:filteredProducts}
    },
    deleteAllfromLS: () => {
      window.localStorage.removeItem('product')
    }
  },
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring
export const { addToLocalCart, updateQuantity, deleteFromLS, deleteAllfromLS } = cartSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default cartSlice.reducer;
