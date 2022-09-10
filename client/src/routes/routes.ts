export const PublicRoutes = {
  start: '/',
  login: '/login',
  home: '/home',
  about: '/about',
  products: '/products',
  productsIdParams: '/products/:id',
  cart: '/cart',
  contact: '/contact',
  searchResult: 'search-results',
  error: '*',
};

export const PrivatesRoutes = {
  dashboard: '/dashboard',
  user: '/user',
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
