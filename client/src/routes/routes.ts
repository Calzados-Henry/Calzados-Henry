export const PublicRoutes = {
  start: '/',
  login: '/login',
  register: '/register',
  home: '/home',
  about: '/about',
  products: '/products',
  productsIdParams: '/products/:id',
  cart: '/cart',
  contact: '/contact',
  searchResult: 'search-results',
  profile: '/profile',
  settings: 'settings',
  error: '*',
};

export const PrivatesRoutes = {
  dashboard: '/dashboard',
  user: '/user',
  checkout: '/checkout',
  addProduct: 'addProduct',
  addCategory: 'addCategory',
  addAtribute: 'addAtribute',
};

export const URL = {
  baseURL: 'http://localhost:3001',
};

export const Endpoints = {
  searchProduct: `${URL.baseURL}${'/products/search'}`,
};
