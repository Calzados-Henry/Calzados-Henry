import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../routes/routes';
import toast from 'react-hot-toast';

export const searchProduct = createAsyncThunk('search-product', (search: any) => {
  return fetch(`${Endpoints.searchProduct}/${search}`)
    .then(res => res.json())
    .catch(err => console.log(err));
});

const searchReducer = (builder: any) => {
  builder.addCase(searchProduct.pending, (state, action) => {
    toast.loading('Buscando coincidencias...');
  });

  builder.addCase(searchProduct.fulfilled, (state, action) => {
    console.log(action);
    if (action.payload.length) {
      toast.dismiss();
      toast.success('Redirigiendo...');
    } else {
      toast.dismiss();
      toast.error('No se han encontrado coincidencias');
    }
    state.searchResult = action.payload;
  });

  builder.addCase(searchProduct.rejected, (state, action) => {
    toast.dismiss();
    toast.error('<b>No se encontraron coincidencias</b>');
    state.searchResult = [];
  });
};

export default searchReducer;
