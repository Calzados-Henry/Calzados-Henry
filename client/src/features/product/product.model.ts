export interface Rating {
  rate: number;
  count: number;
}
export interface ProductI {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}