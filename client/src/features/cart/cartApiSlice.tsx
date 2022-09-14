import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartI, State } from './CartSlice';


const getUserCart: any = createAsyncThunk('cart/getUserCart', (idUser:number) => {
  return axios.get(`http://localhost:3001/users?id=${idUser}`)
      .then(response => {
        const newInfo:CartI[] = response.data.cart.arrayCarrito.map((r: any) => {
          const updated: CartI = {...r, idProduct: r.id_details , idUser}
          return updated
        }) 
        return newInfo
      })
      .catch(e=> {
        const newInfo: [] = []
        return newInfo
      })
})

const setUserCart: any = createAsyncThunk('cart/setUserCart', async ({id, products, token}: {id:number, products:CartI[] | CartI, token:string}) => {
  if(Array.isArray(products)) {
        let arrayCart: [] = []
        products.forEach(async p=> {
            let response = await axios.post(`http://localhost:3001/users/cart`, {
            id_user: id,
            id_product_details: p.idProduct,
            quantity: p.quantity
            }, {
            headers: {
                'Authorization': `bearer ${token}`
            }
            })
            arrayCart = response.data.arrayCarrito   
            })

        const newInfo:CartI[] = arrayCart.map((r: any) => {
        const updated: CartI = {...r, idProduct: r.id_details , idUser: id}
        return updated
      })
      return newInfo
    } else {
        console.log('entro en 1')
        let response = await axios.post(`http://localhost:3001/users/cart`, {
            id_user: id,
            id_product_details: products.idProduct,
            quantity: products.quantity
            }, {
            headers: {
                'Authorization': `bearer ${token}`
            }
            })
                  console.log(response.data)
                  const newInfo:CartI[] = response.data.arrayCarrito.map((r: any) => {
                  const updated: CartI = {...r, idProduct: r.id_details , idUser: id}
                  return updated
                }) 
                return newInfo
    }
})

const deleteUserCart: any = createAsyncThunk('cart/deleteUserCart', async ({idUser, idProduct}: {idUser:number, idProduct: number}) => {
  
  if(idProduct) {
    let response = await axios.delete('http://localhost:3001/users/cart', {
      data: {
        id_user: idUser,
        id_product_details: idProduct
      }})
        const newInfo:CartI[] = response.data.arrayCarrito.map((r: any) => {
        const updated: CartI = {...r, idProduct: r.id_details , idUser}
        return updated
      })
        return newInfo
    } else {
      let response = await axios.delete('http://localhost:3001/users/cart/all', {
      data: {
        id_user: idUser
      }})
      return response.data
    }
})

// Estado inicial que puede ser cualquier cosa
const initialState: State = {
  loading: false,
  complete: false,
  error: '',
  products: []
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
      state.products = action.payload
      state.complete = true
      state.error = ''
    }) 
    builder.addCase(setUserCart.rejected, (state: State, action)=>{
      state.products = initialState.products
      state.error = action.error.message || ''
      state.complete = false
    })
    //Builder deleteUser
    builder.addCase(deleteUserCart.pending, (state: State) =>{
      state.loading = true
      state.complete = false
    })
    builder.addCase(deleteUserCart.fulfilled,(state: State, action)=>{
      state.loading = false
      state.products = action.payload
      state.complete = true
      state.error = ''
    }) 
    builder.addCase(deleteUserCart.rejected, (state: State, action)=>{
      state.products = initialState.products
      state.complete = false
      state.error = action.error.message || ''
    })
}
});

export const getApiUserCart: any = getUserCart
export const setApiUserCart: any = setUserCart
export const deleteApiUserCart: any = deleteUserCart

export const { reset } = cartApiSlice.actions
// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default cartApiSlice.reducer;
