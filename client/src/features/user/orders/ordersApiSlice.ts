import { apiSlice } from '@/features/api/apiSlice';
import { UserI } from '@/sehostypes';
import { OrderI } from '@/sehostypes/Orders';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getOrders: builder.query({
      query: () => ({
        url: `/orders`,
      }),
    }),
    getOrdersUser: builder.query<Partial<OrderI[]>, UserI['id']>({
      query: () => ({
        url: `/orders/user/`,
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrdersUserQuery } = ordersApiSlice;
