import { apiSlice } from "../api/apiSlice";

export interface User {
  id: number | null
  username: string | null
  email: string | null
  name: string | null
  last_name: string | null
  birth_date: Date | null
  phone: string | null
  identification: number | null
  type_user: string | null
}

export interface UserResponse extends User {
  user: User
  message: string | null
  token: string | null
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