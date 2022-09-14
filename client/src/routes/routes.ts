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
  // Rutas user
  user: '/user',
  settings: '/user/settings',
  profile: 'profile',
  addaddress: 'address',
  userOrders: 'orders',
  checkout: 'checkout',

  dashboard: '/dashboard',
  addProduct: 'addproduct',
  addCategory: 'addcategory',
  addAttribute: 'addattribute',
};

export const URL = {
  baseURL: 'http://localhost:3001',
};

export const Endpoints = {
  searchProduct: `${URL.baseURL}${'/products/search'}`,
};
