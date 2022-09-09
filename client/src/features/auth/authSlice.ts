import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';


// Esto es typescript
export interface AuthUser {
    user: string | null,
    rol: string | null,
    token: string | null;
}

// Estado inicial que puede ser cualquier cosa
const initialState: AuthUser = {
    user: null,
    rol: null,
    token: null
};

export const authSlice = createSlice({
  name: 'auth', // Optional
  initialState,
  // Aca van los reducers
  // Redux Toolkit nos permite escribir lógica "mutante" en reductores. Eso
  // en realidad no muta el estado porque usa la biblioteca Immer,
  // que detecta cambios en un "estado de borrador" y produce un nuevo
  // estado inmutable basado en esos cambios
  reducers: {
    setCredentials: (
      state,
      { payload: { user, rol, token } }: PayloadAction<{ user:string | null; rol:string | null; token: string | null}>
    ) => {
      state.user = user
      state.rol = rol
      state.token = token
      window.localStorage.setItem('user', JSON.stringify({user, rol, token}))
    },
    removeCredentials: () => {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('userInfo')
      return initialState
    },
  },
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring
export const { setCredentials, removeCredentials } = authSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default authSlice.reducer;


export const selectCurrentUser = (state:RootState) => state.auth.user
export const selectCurrentToken = (state:RootState) => state.auth.token