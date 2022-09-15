import { apiSlice } from '@/features/api/apiSlice';
import { AddressPostDTO } from '@/sehostypes/Address';
import { UserI } from '@/sehostypes/User';

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAddresses: builder.query({
      query: (userId: UserI['id']) => ({
        url: `/addresses/${userId}`,
      }),
    }),
    createAddress: builder.mutation<AddressPostDTO, Partial<AddressPostDTO>>({
      query: address => ({
        url: `/address/${address.userId}`,
        method: 'POST',
        body: address,
      }),
    }),
    updateAddress: builder.mutation<AddressPostDTO, Partial<AddressPostDTO>>({
      query: address => ({
        url: `/address/${address.userId}`,
        method: 'PATCH',
        body: address,
      }),
    }),
    deleteAddress: builder.mutation<AddressPostDTO, Partial<AddressPostDTO>>({
      query: address => ({
        url: `/address/${address.userId}`,
        method: 'DELETE',
        body: address,
      }),
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApiSlice;
