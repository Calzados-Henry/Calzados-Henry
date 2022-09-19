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
  resetPassword: '/reset-password/:name',
  forgotPassword: '/reset-password',
  error: '*',
  adproduc:"/pruebaAdProduct"
};

export const PrivatesRoutes = {
  // Rutas user
  user: '/user',
  settings: '/user/settings',
  profile: 'profile',
  addaddress: 'address',
  userOrders: 'orders',
  favorites: 'favorites',
  checkout: '/cart/checkout',

  admin: '/admin',
  dashboard: '/dashboard',
  addProduct: 'addProduct',
  addCategory: 'addcategory',
  addAttribute: 'addattribute',

};

export const URL = {
  baseURL: 'http://localhost:3001',
};

export const Endpoint = {
  searchProduct: `${URL.baseURL}/products/search`,
  registerUser: `${URL.baseURL}/users/`,
};
