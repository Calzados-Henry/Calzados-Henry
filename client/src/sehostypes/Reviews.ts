export interface User {
  first_name: string;
  last_name: string;
  username: string;
}
export interface ReviewsI {
  id_product: number;
  id_user: number;
  review: string;
  rate: number;
  date: string;
  isActive: boolean;
  User: User;
}

export interface ReviewsPostI extends Omit<ReviewsI, 'isActive' | 'date' | 'User'> {}
export interface ReviewsDeleteI extends Pick<ReviewsI, 'id_product' | 'id_user'> {}
