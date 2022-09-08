import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { User } from '../auth/authApiSlice';


// Estado inicial que puede ser cualquier cosa
const initialState: User = {
    id: null,
    username: null,
    email: null,
    name: null,
    last_name: null,
    birth_date: null,
    phone: null,
    identification: null,
    type_user: null,
};

export const userSlice = createSlice({
  name: 'user', // Optional
  initialState,
  // Aca van los reducers
  // Redux Toolkit nos permite escribir lógica "mutante" en reductores. Eso
  // en realidad no muta el estado porque usa la biblioteca Immer,
  // que detecta cambios en un "estado de borrador" y produce un nuevo
  // estado inmutable basado en esos cambios
  reducers: {
    setUser: (
      state, action: PayloadAction<User>
    ) => {
        state.id = action.payload.id,
        state.username = action.payload.username
        state.email = action.payload.email
        state.name = action.payload.name
        state.last_name = action.payload.last_name
        state.birth_date = action.payload.birth_date
        state.phone = action.payload.phone
        state.identification = action.payload.identification
        state.type_user = action.payload.type_user
        
    },
    removeUser: () => {
      return initialState
    },
  },
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring
export const { setUser, removeUser } = userSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default userSlice.reducer;