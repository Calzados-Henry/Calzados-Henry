import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Filter, ProductI, ProductPartial } from '../../sehostypes/Product';
import searchReducer from './searchReducer';

// Estado inicial que puede ser cualquier cosa
const initialState: any = {
  allProducts: [],
  renderProducts: [],
  product: {}
};

export const productsSlice = createSlice({
  name: 'products', // Optional
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductPartial>) => {
      state.product = action.payload
    },
    resetProduct: (state) => {
      state.product = {}
    },
    setProducts: (state, action: PayloadAction<ProductPartial[]>) => {
      state.allProducts = action.payload;
      state.searchResult = [];
    },
    setSearchProducts: (state, action: PayloadAction<ProductPartial[]>) => {
      state.searchProducts = action.payload;
    },
     resetSearch: state => {
      state.searchResult = [];
    },
    filtProducts: (state, action: PayloadAction<Filter[]>) => {
      let filtro = [];
      filtro = state.allProducts.filter(
        (item: ProductI ) => action.payload.every(filter => 
          filter.clave === 'Category' 
          ? filter.valor !== ''
            ? item.Category.category === filter.valor 
            : true 
          : filter.clave === 'price' 
            ? filter.valor.top !== 0
              ? item.sell_price >= filter.valor.base 
                && item.sell_price <= filter.valor.top 
              : true 
            : filter.valor !== '' 
              ? item[filter.clave as keyof ProductI] === filter.valor 
              : true
        ))
        state.allProducts = filtro.length ? filtro : []

    },
    sortProducts: (state, action: PayloadAction<string>) => {
      const orderProducts = state.allProducts;

      if (action.payload === 'lowerPrice') {
        orderProducts.sort((productA: ProductI, productB: ProductI) => 
          (productA.sell_price - productB.sell_price) 
         
          
        );
      }
      if (action.payload === 'higherPrice') {
        orderProducts.sort((productA: ProductI, productB: ProductI) => 
        
           (productB.sell_price - productA.sell_price) 
          
        );
      }
      if (action.payload === 'nameZA') {
        orderProducts.sort((productA: ProductI, productB: ProductI) => {
          if (productA.name > productB.name) return -1;
          if (productA.name < productB.name) return 1;
          return 0;
        });
      }
      if (action.payload === 'nameAZ') {
        orderProducts.sort((productA: ProductI, productB: ProductI) => {
          if (productA.name < productB.name) return -1;
          if (productA.name > productB.name) return 1;
          return 0;
        });
      }
      if (action.payload === 'bestSellers') {
        orderProducts.sort((productA: ProductI, productB: ProductI) => {
          if (productA.sold < productB.sold) return -1;
          if (productA.sold > productB.sold) return 1;
          return 0;
        });
      }

      state.allProducts = orderProducts;
    },
  },
  extraReducers: searchReducer
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring

export const {
  filtProducts,
  setProducts,
  setProduct,
  resetProduct,
  setSearchProducts,
  resetSearch,
  sortProducts,
} = productsSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default productsSlice.reducer;
