import { apiSlice } from '@/features/api/apiSlice';
import { UserI, ReviewsI, ReviewsPostI, ReviewsDeleteI, ProductI } from '@/sehostypes';

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getReviewsUser: builder.query<ReviewsI[], UserI['id']>({
      query: idUser => ({
        url: `/reviews/user/${idUser}`,
      }),
      transformResponse: (reviews: ReviewsI[]) => reviews?.filter(item => item.isActive),
      providesTags: ['User', 'Product', 'Reviews'],
    }),
    getReviewsProduct: builder.query<ReviewsI[], ProductI['id']>({
      query: idProduct => ({
        url: `/reviews/user/${idProduct}`,
      }),
      transformResponse: (reviews: ReviewsI[]) => reviews?.filter(item => item.isActive),
      providesTags: ['User', 'Product', 'Reviews'],
    }),
    createReview: builder.mutation<ReviewsI, ReviewsPostI>({
      query: review => ({
        url: '/reviews',
        method: 'POST',
        body: review,
      }),
      invalidatesTags: ['User', 'Product', 'Reviews'],
    }),
    deleteReview: builder.mutation<ReviewsI, ReviewsDeleteI>({
      query: reviewData => ({
        url: '/reviews',
        method: 'DELETE',
        body: reviewData,
      }),
      invalidatesTags: ['User', 'Product', 'Reviews'],
    }),
  }),
});

export const { useGetReviewsUserQuery, useCreateReviewMutation, useDeleteReviewMutation } =
  reviewApiSlice;
