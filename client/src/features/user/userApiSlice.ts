import { apiSlice } from '../api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.query({
      query: userId => `users?id=${userId}`,
    }),
  }),
});

export const { useGetUserByIdQuery } = userApiSlice;
