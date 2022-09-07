import { apiSlice } from "../api/apiSlice";

export interface User {
  id: number
  username: string
  password: string
  email: string
  name: string
  last_name: string
  birth_date: Date
  phone: number
  identification: number
  type_user: string
}

export interface UserResponse extends User {
  user: User
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: credentials => ({
                url: 'login',
                method: 'POST',
                body: { ...credentials }
            }),
        }),
        protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
    })
})

export const { useLoginMutation, useProtectedMutation } = authApiSlice