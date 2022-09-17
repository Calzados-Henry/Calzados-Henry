import { apiSlice } from '../api/apiSlice';
import { ProductI } from './product.model';
import { createSelector, createEntityAdapter/* , EntityState */ } from '@reduxjs/toolkit';


const productAdapter = createEntityAdapter<ProductI>({});
const initialState = productAdapter.getInitialState();
export const pokemonSelector = productAdapter.getSelectors();

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<ProductI[], void>({
      query: () => '/products',
      transformResponse: (response: ProductI[]) => {
        productAdapter.setAll(initialState, response);
        return response;
      },
      providesTags: ['Product'],
    }),
    getProductsDashboard: builder.query({
      query:() => '/products/dashboard',
      transformResponse: ( response ) => {
        return response
      } 
  }),
    getProduct: builder.query<ProductI, string | void>({
      query: (id:string) => `/products/id/${id}`,
    }),
    addNewProduct: builder.mutation({
      query: body => ({
        url: '/addproduct',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const { useGetProductsQuery, useAddNewProductMutation, useGetProductQuery, useGetProductsDashboardQuery } =
  productsApiSlice;

// returns the query result object
export const selectProductsResult = productsApiSlice.endpoints.getProducts.select();

// Creates memoized selector
const selectProductsData = createSelector(
  selectProductsResult,
  productsResult => productsResult.data,
);
// normalized state object with ids & entities

// // getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllProducts,
//   // Pass in a selector that returns the posts slice of state
// } = productAdapter.getSelectors(state => selectProductsData(state));
