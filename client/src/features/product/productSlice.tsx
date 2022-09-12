import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useGetProductsQuery } from './productApiSlice';
import { ProductPartial, ProductI, Filter } from '../../sehostypes/Product';
import searchReducer from './searchReducer';

// Estado inicial que puede ser cualquier cosa
const initialState: any = {
  allProducts: [],
  renderProducts: [],
};

export const productsSlice = createSlice({
  name: 'products', // Optional
  initialState,
  reducers: {
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
    reset: state => {
 const { data, error, isLoading, isSuccess } = useGetProductsQuery();
 if (data) state.allProducts = data
    },

    filtProducts: (state, action: PayloadAction<Filter[]>) => {

      let filtro = [];
      // [{clave: 'price', value: {}}, {clave: 'category', value: ''}]
      // item.price !== undefined &&
      //     item.price >= action.payload.base &&
      //     item.price <= action.payload.top,

      filtro = state.allProducts.filter(
        (item: ProductI) => action.payload.every(filter => 
          filter.clave === 'Category' ?(filter.valor !== '' && item.Category.category === filter.valor ):
          (filter.clave === 'price' ?  ( (filter.valor.top !== 0 && filter.valor.base !== 0) &&
          (item.sell_price >= filter.valor.base &&
          item.sell_price <= filter.valor.top) ): (filter.valor !== '' && item[filter.clave] === filter.valor))
          )
          )
          

      state.allProducts = filtro;
    },
    filtProductsByCategory: (state, action: PayloadAction<string>) => {
      let filtCategory = [];

      filtCategory = state.allProducts.filter(
        (item: ProductPartial) =>
          item.category !== undefined &&
          item.category.id !== undefined &&
          item.category.category === action.payload,
      );
      state.allProducts = filtCategory;
    },
    sortProducts: (state, action: PayloadAction<string>) => {
      const orderProducts = state.allProducts;

      if (action.payload === 'lowerPrice') {
        orderProducts.sort((productA: ProductI, productB: ProductI) => {
          if (productA.sell_price < productB.sell_price) return -1;
          if (productA.sell_price > productB.sell_price) return 1;
          return 0;
        });
      }
      if (action.payload === 'higherPrice') {
        orderProducts.sort((productA: ProductI, productB: ProductI) => {
          if (productA.sell_price > productB.sell_price) return -1;
          if (productA.sell_price < productB.sell_price) return 1;
          return 0;
        });
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
  extraReducers: searchReducer,
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring

export const {
  filtProducts,
  setProducts,
  setSearchProducts,
  resetSearch,
  sortProducts,
  filtProductsByPrice,
  filtProductsByCategory,
  reset,
} = productsSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default productsSlice.reducer;
