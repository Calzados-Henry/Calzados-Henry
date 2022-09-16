import { apiSlice } from '../api/apiSlice';
import { UserI } from '@/sehostypes/User';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.query<UserI, UserI['id']>({
      query: id => ({
        url: `/users?id=${id}`,
      }),
      providesTags: ['User', 'Updates'],
    }),
    updateUser: builder.mutation<Partial<UserI>, Partial<UserI>>({
      query: updates => ({
        url: `/users`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['User', 'Updates'],
    }),
  }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApiSlice;
