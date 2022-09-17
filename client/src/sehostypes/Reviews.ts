export interface ReviewsI {
  id_product: number | string;
  id_user: number | string;
  review: string;
  rate: number | string;
  date: Date;
  isActive: boolean;
}

export interface ReviewsPostI extends Omit<ReviewsI, 'isActive'> {}
export interface ReviewsDeleteI extends Pick<ReviewsI, 'id_product' | 'id_user'> {}
