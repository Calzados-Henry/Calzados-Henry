export interface OrdersDetailI {
  id: number | string;
  id_order: number | string;
  id_product: number | string;
  name: string;
  image: string;
  gender: string;
  size: string;
  color: string;
  quantity: number;
  season: string;
  price: string;
  Order: {
    total_ammount: number | string;
  };
}

export interface UserOrderI {
  id: number;
  username: string;
  password: string;
  email: string;
  name: string;
  last_name: string;
  birth_date: Date;
  phone: string;
  identification: number;
  type_user: string;
  isActive: boolean;
}

export interface OrderI {
  id: number;
  id_user: number;
  purchase_date: Date;
  address_user: string;
  total_amount: string;
  order_state: string;
  isActive: boolean;
  User: UserOrderI;
  Orders_details: OrdersDetailI[];
}
