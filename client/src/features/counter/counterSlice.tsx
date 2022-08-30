import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Esto es typescript
export interface CounterI {
  value: number;
}

// Estado inicial que puede ser cualquier cosa
const initialState: CounterI = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter', // Optional
  initialState,
  // Aca van los reducers
  // Redux Toolkit nos permite escribir lógica "mutante" en reductores. Eso
  // en realidad no muta el estado porque usa la biblioteca Immer,
  // que detecta cambios en un "estado de borrador" y produce un nuevo
  // estado inmutable basado en esos cambios
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring
export const { increment, decrement, incrementByAmount, decrementByAmount } = counterSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default counterSlice.reducer;
