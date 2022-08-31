import { configureStore } from '@reduxjs/toolkit';
import counter from './features/counter/counterSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './features/api/apiSlice';
// importamos el export default que viene del slice

// Usamos la funcion configureStore y le pasamos un objeto que contiene el reducer/slice.reducer
export const store = configureStore({
  reducer: {
    counter,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
// Inferir los tipos `RootState` y `AppDispatch` de la propia store
export type RootState = ReturnType<typeof store.getState>;
// Tipo inferido: {admin, users, products, etc.}
export type AppDispatch = typeof store.dispatch;
