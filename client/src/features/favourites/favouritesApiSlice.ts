import { apiSlice } from '@/features/api/apiSlice';
import { ProductPartial } from '@/sehostypes';

interface RequestInfo {
    id_user: number
    id_product_details: number
}

export interface FavsInfo {
    id_details: number
    image?: string
    name: string
    color: string
    sizes: Array<object>
    price: number
  }

// <ReturnValueHere, ArgumentTypeHere>
export const favouritesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getFavourites: builder.query<FavsInfo[], number>({
      query: (id) => ({
        url: `/users/favs/${id}`,
      }),
      providesTags: ['Favourites'],
    }),
    createFavourites: builder.mutation<FavsInfo[], RequestInfo>({
      query: (body) => ({
        url: `/users/favs/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Favourites'],
    }),
    deleteFavourites: builder.mutation<ProductPartial[], RequestInfo>({
      query: (body) => ({
        url: `/users/favs/`,
        method: 'DELETE',
        body,
    }),
      invalidatesTags: ['Favourites'],
    }),
  }),
});

export const {
  useGetFavouritesQuery,
  useCreateFavouritesMutation,
  useDeleteFavouritesMutation,
} = favouritesApiSlice;
