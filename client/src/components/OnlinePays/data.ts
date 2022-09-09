export const ProductData = {
  id: 11,
  name: 'Botas Hiking Timberland Mt. Maddsen ',
  description:
    'moda y ocio: abandona la impresión tradicional de calzado de seguridad, les damos un aspecto más elegante, haciendo de estos zapatos de trabajo de seguridad un artículo a juego y no parecerá demasiado monótono debido al trabajo.',
  gender: 'Male',
  season: 'Winter',
  rate_average: '0.00',
  price: 2299,
  sold: 50,
  images: [
    {
      id: 1,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_693021-MLA50583083989_072022-F.webp',
    },
    {
      id: 2,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_865241-MLA50583083986_072022-F.webp',
    },
    {
      id: 3,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_826352-MLA50583083987_072022-F.webp',
    },
  ],
  category: {
    id: 4,
    category: 'Botas',
    isActive: true,
  },
  reviews: [
    {
      id: 1,
      id_user: 1,
      review: 'Muy bueno :D',
      rate: 3,
      date: '10/08/2022',
      isActive: true,
    },
    {
      id: 2,
      id_user: 2,
      review: 'Maso',
      rate: 3,
      date: '10/08/2022',
      isActive: true,
    },
  ],
  product_details: [
    {
      id_product: 1,
      id_size: 1,
      id_color: 1,
      stock: 10,
      isActive: true,
    },
    {
      id_product: 1,
      id_size: 2,
      id_color: 1,
      stock: 10,
      isActive: true,
    },
    {
      id_product: 1,
      id_size: 2,
      id_color: 2,
      stock: 10,
      isActive: true,
    },
    {
      id_product: 1,
      id_size: 3,
      id_color: 1,
      stock: 10,
      isActive: true,
    },
    {
      id_product: 1,
      id_size: 3,
      id_color: 2,
      stock: 10,
      isActive: true,
    },
    {
      id_product: 1,
      id_size: 3,
      id_color: 3,
      stock: 10,
      isActive: true,
    },
    {
      id_product: 1,
      id_size: 3,
      id_color: 4,
      stock: 10,
      isActive: true,
    },
    {
      id_product: 1,
      id_size: 4,
      id_color: 1,
      stock: 10,
      isActive: true,
    },
  ],
};

export const ClientData = {
  id: 1,
  email: 'John@gmail.com',
  username: 'johnd',
  password: 'm38rmF$',
  name: {
    firstname: 'John',
    lastname: 'Doe',
  },
  address: {
    city: 'kilcoole',
    street: '7835 new road',
    number: 3,
    zipcode: '12926-3874',
    geolocation: {
      lat: '-37.3159',
      long: '81.1496',
    },
  },
  phone: '1-570-236-7033',
};
