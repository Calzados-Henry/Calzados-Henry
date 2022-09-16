import { PhotoSizeSelectActualRounded } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Al exportar de forma individual para acceder al 
//slice en si tendremos que importar destructurando

//PASO 1 : Crear un async thunk que va a ser nuestra función para
//realizar el llamado a la api.
const getCategory:any = createAsyncThunk('categories/getCategories',()=>{
    return axios.get(`http://localhost:3001/products/details/category`)
    .then(response=>response.data)
    .catch(e=>e.message)
})
const deleteCategory:any = createAsyncThunk('categories/deleteCategories',()=>{
    return axios.delete(`http://localhost:3001/products/details/category`)
    .then(response=>response.data)
    .catch(e=>e.message)
})

//PASO 2: Definimos el initial state con un loading,
//un array con el state y un handleError.
const initialState = {
    loading:false,
    categories:[],
    error:'',
}
//Paso 3 creamos nuestro slice 

//añadimos el extra reducer
//usando el builder agregaremos casos
//por cada uno de los casos 
//por cada uno de los casos
export const categories = createSlice({
        name:'categories',
        initialState,
        reducers:{
        },
        extraReducers: builder  => {  
            builder.addCase(getCategory.pending, state =>{
                state.loading = true
            })
            builder.addCase(getCategory.fulfilled,(state, action)=>{
                state.loading = false
                state.categories = action.payload
                state.error = ''
            }) 
            builder.addCase(getCategory.rejected, (state, action)=>{
                state.categories = []
                state.error=action.error.message
            })
        }
        })

export const getCategories = getCategory
export default getCategory.reducer     // este ".reducer" permite exportar solo los reducers
                                     //al exportar por defecto.
