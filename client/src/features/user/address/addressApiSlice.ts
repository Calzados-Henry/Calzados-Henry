import { apiSlice } from '@/features/api/apiSlice';
import { AddressPostDTO } from '@/sehostypes/Address';

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAddresses: builder.query({
      query: id => ({
        url: `/addresses/${id}`,
      }),
    }),
    createAddress: builder.mutation<AddressPostDTO, Partial<AddressPostDTO>>({
      query: ({ id, ...address }) => ({
        url: `/address/${id}`,
        method: 'POST',
        body: address,
      }),
    }),
    updateAddress: builder.mutation<AddressPostDTO, Partial<AddressPostDTO>>({
      query: ({ id, ...address }) => ({
        url: `/address/${id}`,
        method: 'PATCH',
        body: address,
      }),
    }),
    deleteAddress: builder.mutation<AddressPostDTO, Partial<AddressPostDTO>>({
      query: id => ({
        url: `/address/${id}`,
        method: 'DELETE',
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
