import { Images } from "../../sehostypes/Product";

export interface Rating {
  rate: number;
  count: number;
}
export interface Category {
  id: number,
  category: string,
  isActive: boolean
}

export interface ProductI {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  category?: Category;
  images?: Images[];
  rating?: Rating;
}
export interface RatingPartial extends Partial<Rating> {}
export interface ProductPartial extends Partial<ProductI> {}
