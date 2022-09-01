import { apiSlice } from '../api/apiSlice';
import { ProductI } from './product.model';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<ProductI[], void>({
      query: () => '/products',
      providesTags: ['Product'],
    }),
    getProduct: builder.query<ProductI[], void>({
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
