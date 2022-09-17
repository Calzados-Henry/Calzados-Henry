import { apiSlice } from '@/features/api/apiSlice';
import { AddressPostDTO, AddressI } from '@/sehostypes/Address';

// <ReturnValueHere, ArgumentTypeHere>
export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAddress: builder.query<AddressI[], void>({
      query: () => ({
        url: `/users/address/`,
      }),
      transformResponse: (address: AddressI[]) => address?.filter(item => item.isActive),
      providesTags: ['Address'],
    }),
    createAddress: builder.mutation<AddressPostDTO, AddressPostDTO>({
      query: address => ({
        url: `/users/address/`,
        method: 'POST',
        body: address,
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
        url: `/users/address/`,
        method: 'DELETE',
        body: { id },
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
