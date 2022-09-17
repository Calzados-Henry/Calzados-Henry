import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { UserInfoI } from '../../sehostypes/User';
import { persistLocalStorage, clearLocalStorage } from '../../utils/auhtLocalStorage';

// Esto es typescript
export interface AuthUser {
  id: number | string | null;
  user: string | null;
  rol: string | null;
  token: string | null;
}

// Estado inicial que puede ser cualquier cosa
const EmptyUserState: AuthUser = {
  id: null,
  user: null,
  rol: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth', // Optional
  initialState: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : EmptyUserState,
  reducers: {
    createUser: (state, action) => {
      persistLocalStorage<UserInfoI>(UserKey, action.payload);
      return action.payload;
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<UserInfoI>(UserKey, result);
      return result;
    },
    resetUser: () => {
      clearLocalStorage(UserKey);
      return EmptyUserState;
    },
  },
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring
export const { createUser, updateUser, resetUser } = authSlice.actions;
export const UserKey = 'user';
// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default authSlice.reducer;

export const selectorCurrentUserId = (state: RootState) => state.auth.id;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
