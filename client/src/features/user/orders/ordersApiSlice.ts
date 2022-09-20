import { apiSlice } from '@/features/api/apiSlice';
import { UserI } from '@/sehostypes';
import { OrderI, OrdersDetailI } from '@/sehostypes/Orders';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getOrders: builder.query({
      query: () => ({
        url: `/orders`,
      }),
    }),
    getOrdersUser: builder.query<Partial<OrderI[]>, void>({
      query: () => ({
        url: `/orders/user/`,
      }),
    }),
    getOrder: builder.query<OrdersDetailI[], number | string>({
      query: id => `/orders/details/${id}`,
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrdersUserQuery, useGetOrderQuery } = ordersApiSlice;
