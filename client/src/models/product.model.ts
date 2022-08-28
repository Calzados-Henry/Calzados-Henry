/* eslint-disable no-use-before-define */
export interface ProductI {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingI;
}
export interface RatingI {
  rate: number;
  count: number;
}
