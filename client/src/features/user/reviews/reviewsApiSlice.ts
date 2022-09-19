import { apiSlice } from '@/features/api/apiSlice';
import { ProductI, ReviewsDeleteI, ReviewsI, ReviewsPostI, UserI } from '@/sehostypes';

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getReviewsUser: builder.query<ReviewsI[], UserI['id']>({
      query: idUser => ({
        url: `/reviews/user/${idUser}`,
      }),
      // transformResponse: (reviews: ReviewsI[]) => reviews?.filter(item => item.isActive),
      providesTags: ['Reviews'],
    }),
    getReviewsProduct: builder.query<ReviewsI[], ProductI['id']>({
      query: idProduct => ({
        url: `/reviews/product/${idProduct}`,
      }),
      // transformResponse: (reviews: ReviewsI[]) => reviews?.filter(item => item.isActive),
      providesTags: ['Reviews'],
    }),
    createReview: builder.mutation<ReviewsI, ReviewsPostI>({
      query: review => ({
        url: '/reviews',
        method: 'POST',
        body: review,
      }),
      invalidatesTags: ['Reviews'],
    }),
    deleteReview: builder.mutation<ReviewsI, ReviewsDeleteI>({
      query: reviewData => ({
        url: '/reviews',
        method: 'DELETE',
        body: reviewData,
      }),
      invalidatesTags: ['Reviews'],
    }),
  }),
});

export const {
  useGetReviewsUserQuery,
  useGetReviewsProductQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = reviewApiSlice;
