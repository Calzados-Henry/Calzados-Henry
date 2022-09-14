import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { UserInfoI } from '@/sehostypes/User';
import { persistLocalStorage, clearLocalStorage } from '../../utils/auhtLocalStorage';

const EmptyUserState: UserInfoI = {};

export const userSlice = createSlice({
  name: 'userInfo', // Optional
  initialState: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : EmptyUserState,
  reducers: {
    createUser: (_, action) => {
      persistLocalStorage<UserInfoI>(UserInfoKey, action.payload);
      return action.payload;
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<UserInfoI>(UserInfoKey, result);
      return result;
    },
    resetUser: () => {
      clearLocalStorage(UserInfoKey);
      return EmptyUserState;
    },
  },
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring
export const { createUser, updateUser, resetUser } = userSlice.actions;
export const UserInfoKey = 'userInfo';
// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default userSlice.reducer;
