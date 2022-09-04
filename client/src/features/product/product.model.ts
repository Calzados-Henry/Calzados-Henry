export interface Rating {
  rate: number;
  count: number;
}
export interface Category {
  id: number,
  category: string,
  isActive: boolean
}
export interface image {
  id: number,
  image: string
}
export interface ProductI {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  category?: Category;
  images?: image[];
  rating?: Rating;
}
export interface RatingPartial extends Partial<Rating> {}
export interface ProductPartial extends Partial<ProductI> {}
