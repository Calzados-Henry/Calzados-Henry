import { apiSlice } from '@/features/api/apiSlice';
import { AddressPostDTO } from '@/sehostypes/Address';

// <ReturnValueHere, ArgumentTypeHere>
export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAddress: builder.query<AddressPostDTO[], void>({
      query: () => ({
        url: `/users/address/`,
      }),
      providesTags: ['Address'],
    }),
    createAddress: builder.mutation<AddressPostDTO, Partial<AddressPostDTO>>({
      query: address => ({
        url: `/users/address/`,
        method: 'POST',
        body: JSON.stringify(address),
      }),
      invalidatesTags: ['Address'],
    }),
    updateAddress: builder.mutation<AddressPostDTO, Partial<AddressPostDTO>>({
      query: address => ({
        url: `/users/address/`,
        method: 'PATCH',
        body: JSON.stringify(address),
      }),
      invalidatesTags: ['Address'],
    }),
    deleteAddress: builder.mutation<AddressPostDTO, number>({
      query: id => ({
        url: `/address/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Address'],
    }),
  }),
});

export const {
  useGetAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApiSlice;
