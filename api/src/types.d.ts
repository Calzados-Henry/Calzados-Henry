import { Reviews } from "./db"
import { Gender, Season } from "./enum"

export interface Orders_detailsI {
  id_order: number | string
  id_product: number | string
  name: string
  image: string
  gender: Gender
  size: string
  color: string
  quantity: number
  season: Season
  price: number
}

export interface SizeI {
  id?: number
  size: string
  isActive: boolean
}

export interface ReviewsI {
  id_product: number
  id_user: number
  review: string
  rate: number
  date: Date
  isActive: boolean
}
export interface ReviewsPostI extends Omit<ReviewsI, "isActive" | "date"> {}

export interface ProductsI {
  id: number
  id_category: number
  name: string
  description: string
  gender: Gender
  season: Season
  rate_average: number
  buy_price: number
  sell_price: number
  isActive: boolean
}

export interface ImagesI {
  id: string
  image: string
  isActive: boolean
}

export interface ColorI {
  id: number
  color: string
  isActive: boolean
}

export interface Product_detailsI {
  id: number
  id_product: number
  id_color: number
  isActive: boolean
}

export interface Product_details_sizeI {
  id_product_details: number
  id_sizes: number
  stock: number
}

export interface CategoryI {
  id: number
  category: string
  isActive: boolean
}

export interface OrdersI {
  id: number
  id_user: number
  purchase_date: Date
  address_user: string
  total_ammount: number
  order_state: string
  isActive: boolean
}

export interface CartDetailsI {
  id_user: number
  id_product_details: number
  id_size: number
  quantity: number
}

export interface sizeCartI {
  id: number
  size: string
  stock: number
}

export interface carrito {
  id_details: number
  image?: string
  name: string
  color: string
  size: Array<object>
  price: number
  sizeCart: sizeCartI
  quantity: number
}

export interface favoritos {
  id_details: number
  image?: string
  name: string
  color: string
  sizes: Array<object>
  price: number
}

export interface UsersI {
  id: number | string
  username: string
  password: string
  email: string
  name: string
  last_name: string
  birth_date: Date
  phone: string
  identification: number
  type_user: TypeUser
  isActive: boolean
}

export interface AddressI {
  id: number
  id_user?: number
  title: string
  address: string
  city: string
  state: string
  country: string
  zip_code: string
  isActive: boolean
}

export interface CarrouselI {
  id?: number
  image: string
  isActive: boolean
}
