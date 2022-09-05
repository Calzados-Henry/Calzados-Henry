import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProductPartial, ProductI, Pricing } from '../../sehostypes/Product';

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
      if (state.allProducts.length === 0) state.allProducts = action.payload;
    },
    reset: state => {
      state.allProducts = [];
    },
    filtProductsByPrice: (state, action: PayloadAction<Pricing>) => {
      let filtro = [];
      filtro = state.allProducts.filter(
        (item: ProductPartial) =>
          item.price !== undefined &&
          item.price >= action.payload.base &&
          item.price <= action.payload.top,
      );
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
          if (productA.price < productB.price) return -1;
          if (productA.price > productB.price) return 1;
          return 0;
        });
      }
      if (action.payload === 'higherPrice') {
        orderProducts.sort((productA: ProductI, productB: ProductI) => {
          if (productA.price > productB.price) return -1;
          if (productA.price < productB.price) return 1;
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
      console.log(state.allProducts);
    },
  },
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring
export const { setProducts, sortProducts, filtProductsByPrice, filtProductsByCategory, reset } =
  productsSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default productsSlice.reducer;
