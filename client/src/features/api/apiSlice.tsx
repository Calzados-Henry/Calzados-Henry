import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store';


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set("authorization", `bearer ${token}`)
        }
        return headers
    }
})


export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes:['Categories', 'Seasons'],
    endpoints: builder => ({})
})
