import { /* createAsyncThunk, */ createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { removeOneProductFromLS, setProductLocalStorage, updateLS } from '../../utils/utils';
// import axios from 'axios';

// Esto es typescript
export interface UserSizeI {
  id?: number
  size?: string 
  stock?: number 
}

export interface CartI {
  idUser: number | null
  idProduct?: number
  image?: string
  name?: string
  color?: string
  size?: UserSizeI[]
  price?: number 
  sizeCart?: UserSizeI
  quantity?: number
}


export interface State {
  loading: boolean
  products: CartI[]
  total: number
  error: string
  complete: boolean
}
// Estado inicial que puede ser cualquier cosa
const initialState: State = {
  loading: false,
  products: localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product') as string) : [],
  total: 0,
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
    updateLocalCart: (state: State, action: PayloadAction<{method: string, id: number, sizes: UserSizeI}>) => {
      const updatedProducts = updateLS(action.payload.method, action.payload.id, action.payload.sizes ? action.payload.sizes : {})
      return {...state, products:updatedProducts, complete: !state.complete}
    },
    deleteFromLS: (state: State, action: PayloadAction<number>) => {
      const filteredProducts = removeOneProductFromLS(action.payload)
      return {...state, products:filteredProducts}
    },
    deleteAllfromLS: (state: State) => {
      window.localStorage.removeItem('product')
      return {...state, products: []}
    }
  },
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring
export const { addToLocalCart, updateLocalCart, deleteFromLS, deleteAllfromLS } = cartSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default cartSlice.reducer;
