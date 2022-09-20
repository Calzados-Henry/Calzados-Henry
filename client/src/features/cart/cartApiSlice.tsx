import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartI, State } from './CartSlice';


export const getApiUserCart: any = createAsyncThunk('cart/getApiUserCart', async (idUser:number) => {
  const response = await axios.get(`http://localhost:3001/users/cart/${idUser}`);
  const newInfo: CartI[] = response.data.arrayCarrito.map((r: any) => {
    const updated: CartI = { ...r, idProduct: r.id_details, idUser };
    return updated;
  });
  return {cartProducts: newInfo, totalCart: response.data.totalCarrito};
})

export const setApiUserCart: any = createAsyncThunk('cart/setApiUserCart', async ({id, products, id_size, token}: {id:number, products:CartI[] | CartI, id_size:number, token:string}) => {
  if(Array.isArray(products)) {
        let arrayCart: [] = []
        let total: number = 0
        products.forEach(async p=> {
            let response = await axios.post(`http://localhost:3001/users/cart`, {
              id_user: id,
              id_product_details: p.idProduct,
              quantity: p.quantity,
              id_size: p.sizeCart?.id
              }, {
              headers: {
                  'Authorization': `bearer ${token}`
              }
              })
              arrayCart = response.data.arrayCarrito
              total = response.data.totalCarrito  
              })

        const newInfo:CartI[] = arrayCart.map((r: any) => {
          const updated: CartI = {...r, idProduct: r.id_details , idUser: id}
          return updated
        })
        return {cartProducts: newInfo, totalCart: total}
    } else {
        let response = await axios.post(`http://localhost:3001/users/cart`, {
            id_user: id,
            id_product_details: products.idProduct,
            quantity: 1,
            id_size
            }, {
            headers: {
                'Authorization': `bearer ${token}`
            }
          })
          const newInfo:CartI[] = response.data.arrayCarrito.map((r: any) => {
            const updated: CartI = {...r, idProduct: r.id_details , idUser: id}
            return updated
          }) 
          return {cartProducts: newInfo, totalCart: response.data.totalCarrito}
    }
})

export const deleteApiUserCart: any = createAsyncThunk('cart/deleteApiUserCart', async ({idUser, idProduct}: {idUser:number, idProduct: number}) => {
  
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
        return {cartProducts: newInfo, totalCart: response.data.totalCarrito}
    } else {
      let response = await axios.delete('http://localhost:3001/users/cart/all', {
      data: {
        id_user: idUser
      }})
      return {cartProducts: response.data, totalCart: 0}
    }
})

export const updateApiUserCart: any = createAsyncThunk('cart/updateApiUserCart', async ({idUser, idProduct, quantity, id_size}: {idUser:number, idProduct: number, quantity:number, id_size:number}) => {
  let response = await axios.put('http://localhost:3001/users/cart', {
    id_user: idUser,
    id_product_details: idProduct,
    id_size,
    quantity
  })
  const newInfo:CartI[] = response.data.arrayCarrito.map((r: any) => {
    const updated: CartI = {...r, idProduct: r.id_details , idUser}
    return updated
  })
    return {cartProducts: newInfo, totalCart: response.data.totalCarrito}
})

// Estado inicial que puede ser cualquier cosa
const initialState: State = {
  loading: false,
  complete: false,
  total: 0,
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
    builder.addCase(getApiUserCart.pending, (state: State) =>{
        state.loading = true
        state.complete = false
    })
    builder.addCase(getApiUserCart.fulfilled,(state: State, action)=>{
      state.loading = false
      state.products = action.payload.cartProducts
      state.total = action.payload.totalCart
      state.error = ''
      state.complete = true
    }) 
    builder.addCase(getApiUserCart.rejected, (state: State, action)=>{
      state.error = action.error.message || ''
      state.complete = false
    })
    //Builder SetUser
    builder.addCase(setApiUserCart.pending, (state: State) =>{
      state.loading = true
      state.complete = false
    })
    builder.addCase(setApiUserCart.fulfilled,(state: State, action)=>{
      state.loading = false
      state.products = action.payload.cartProducts
      state.total = action.payload.totalCart
      state.complete = true
      state.error = ''
    }) 
    builder.addCase(setApiUserCart.rejected, (state: State, action)=>{
      state.error = action.error.message || ''
      state.complete = false
    })
    //Builder deleteUser
    builder.addCase(deleteApiUserCart.pending, (state: State) =>{
      state.loading = true
      state.complete = false
    })
    builder.addCase(deleteApiUserCart.fulfilled,(state: State, action)=>{
      state.loading = false
      state.products = action.payload.cartProducts
      state.total = action.payload.totalCart
      state.complete = true
      state.error = ''
    }) 
    builder.addCase(deleteApiUserCart.rejected, (state: State, action)=>{
      state.complete = false
      state.error = action.error.message || ''
    })
    //Builder updateUser
    builder.addCase(updateApiUserCart.pending, (state: State) =>{
      state.loading = true
      state.complete = false
    })
    builder.addCase(updateApiUserCart.fulfilled,(state: State, action)=>{
      state.loading = false
      state.products = action.payload.cartProducts
      state.total = action.payload.totalCart
      state.complete = true
      state.error = ''
    }) 
    builder.addCase(updateApiUserCart.rejected, (state: State, action)=>{
      state.complete = false
      state.error = action.error.message || ''
    })
}
});

export const { reset } = cartApiSlice.actions
// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default cartApiSlice.reducer;
