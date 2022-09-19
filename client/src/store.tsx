import { configureStore } from '@reduxjs/toolkit';
import products from './features/product/productSlice';
import cart from './features/cart/CartSlice';
import cartApiSlice, { getApiUserCart } from './features/cart/cartApiSlice';
import auth from './features/auth/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './features/api/apiSlice';
import checkout from './features/checkout/checkoutSlice';
import user from './features/user/userSlice';
import sizes from './features/sizes/sizesSlice';
import colors from './features/colors/getColorsSlice';
import categories from './features/category/categoriesSlice'
import admin from './features/admin/adminSlice';

// importamos el export default que viene del slice

// Usamos la funcion configureStore y le pasamos un objeto que contiene el reducer/slice.reducer
export const store = configureStore({
  reducer: {
    admin,
    user,
    products,
    cart,
    apiCart: cartApiSlice,
    auth,
    checkout,
    categories,
    colors,
    sizes,
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
