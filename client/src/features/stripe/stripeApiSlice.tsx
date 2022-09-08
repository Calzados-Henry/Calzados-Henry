import { apiSlice } from '../api/apiSlice';

export const stripeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    pay: builder.mutation({
      query: body => ({
        url: 'api/checkout',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePayMutation } = stripeApiSlice;
