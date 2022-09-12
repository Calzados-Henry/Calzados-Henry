import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartI, State } from './CartSlice';
import { useAuth } from '../../hooks/useAuth';
import { store } from '../../store';


const getUserCart: any = createAsyncThunk('cart/getUserCart', (idUser:number) => {
  return axios.get(`http://localhost:3001/users?id=${idUser}`)
      .then(response => {
        const newInfo:CartI[] = response.data.cart.arrayCarrito.map((r: any) => {
          const updated: CartI = {...r, idProdruct: r.id_details , idUser}
          return updated
        }) 
        return newInfo
      })
      .catch(e=> {
        const newInfo: [] = []
        return newInfo
      })
})

const setUserCart = createAsyncThunk('cart/setUserCart', ({id, products, token}: {id:number, products:CartI[] | CartI, token:string}) => {
    console.log(id, products)
    if(Array.isArray(products)) {
        products.forEach(p=> {
            axios.post(`http://localhost:3001/users/cart`, {
            id_user: id,
            id_product_details: p.idProduct,
            quantity: p.quantity
            }, {
            headers: {
                'Authorization': `bearer ${token}`
            }
            })
                .then(response=> response.data)
                .catch(e=>e.message)
            })
    } else {
        axios.post(`http://localhost:3001/users/cart`, {
            id_user: id,
            id_product_details: products.idProduct,
            quantity: products.quantity
            }, {
            headers: {
                'Authorization': `bearer ${token}`
            }
            })
                .then(response=> response.data)
                .catch(e=>e.message)
    }
})

// Estado inicial que puede ser cualquier cosa
const initialState: State = {
  loading: false,
  products: [],
  error: '',
  complete: false
}

export const cartApiSlice = createSlice({
  name: 'apiCart', // Optional
  initialState,
  // Aca van los reducers
  // Redux Toolkit nos permite escribir lógica "mutante" en reductores. Eso
  // en realidad no muta el estado porque usa la biblioteca Immer,
  // que detecta cambios en un "estado de borrador" y produce un nuevo
  // estado inmutable basado en esos cambios
  reducers: {
    reset: () => {
      return initialState
    }
  },
  extraReducers: builder  => {  
    //Builder GetUser
    builder.addCase(getUserCart.pending, (state: State) =>{
        state.loading = true
        state.complete = false
    })
    builder.addCase(getUserCart.fulfilled,(state: State, action)=>{
        state.loading = false
        state.products = action.payload
        state.error = ''
        state.complete = true
    }) 
    builder.addCase(getUserCart.rejected, (state: State, action)=>{
        state.products = initialState.products
        state.error = action.error.message || ''
        state.complete = false
    })
    //Builder SetUser
    builder.addCase(setUserCart.pending, (state: State) =>{
      state.loading = true
      state.complete = false
    })
    builder.addCase(setUserCart.fulfilled,(state: State, action)=>{
        state.loading = false
        state.products = [...state.products]
        state.complete = true
        state.error = ''
    }) 
    builder.addCase(setUserCart.rejected, (state: State, action)=>{
        state.products = initialState.products
        state.error = action.error.message || ''
        state.complete = false
    })
}
});

export const getApiUserCart: any = getUserCart
export const setApiUserCart: any = setUserCart
// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default cartApiSlice.reducer;

window.localStorage.getItem('userInfo') && getUserCart(JSON.parse(window.localStorage.getItem('userInfo') as string).id)