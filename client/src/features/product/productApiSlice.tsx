import { apiSlice } from '../api/apiSlice';
import { ProductI } from './product.model';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const productAdapter = createEntityAdapter<ProductI | ProductI[]>();
const initialState = productAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<ProductI[], void>({
      query: () => '/products',
      providesTags: ['Product'],
    }),
    getProduct: builder.query<ProductI, string | void>({
      query: id => `/products/${id}`,
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

export const { useGetProductsQuery, useAddNewProductMutation, useGetProductQuery } =
  productsApiSlice;

// returns the query result object
export const selectProductsResult = productsApiSlice.endpoints.getProducts.select();

// Creates memoized selector
const selectProductsData = createSelector(
  selectProductsResult,
  productsResult => productsResult.data,
);
// normalized state object with ids & entities

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the posts slice of state
} = productAdapter.getSelectors(state => selectProductsData(state) ?? initialState);
