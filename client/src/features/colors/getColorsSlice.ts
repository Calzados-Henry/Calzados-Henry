import { PhotoSizeSelectActualRounded } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Al exportar de forma individual para acceder al 
//slice en si tendremos que importar destructurando


//PASO 1 : Crear un async thunk que va a ser nuestra función para
//realizar el llamado a la api.
const getColor:any = createAsyncThunk('color/getColors',()=>{
    return axios.get(`http://localhost:3001/products/details/color`)
        .then(response=>response.data)
        .catch(e=>e.message)
})
//PASO 2: Definimos el initial state con un loading,
//un array con el state y un handleError.
const initialState = {
    loading:false,
    colors:[],
    error:'',
}
//Paso 3 creamos nuestro slice 

//añadimos el extra reducer
//usando el builder agregaremos casos
//por cada uno de los casos 
//por cada uno de los casos
export const colors = createSlice({
        name:'colors',
        initialState,
        reducers:{
        },
        extraReducers: builder  => {  
            builder.addCase(getColor.pending, state =>{
                state.loading = true
            })
            builder.addCase(getColor.fulfilled,(state, action)=>{
                state.loading = false
                state.colors = action.payload
                state.error = ''
            }) 
            builder.addCase(getColor.rejected, (state, action)=>{
                state.colors = []
                state.error=action.error.message
            })
        }
        })

export const getColors = getColor
export default colors.reducer // este ".reducer" permite exportar solo los reducers
                                     //al exportar por defecto.
