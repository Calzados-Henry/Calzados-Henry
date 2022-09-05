export interface UserI {
  id: number | string;
}
export interface Rating {
  rate: number;
  count: number;
}
export interface ProductI {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  sold: number;
}

// DTO Data Transfer Object : interfaces creadas a partir de una intefaz para manejo de datos
export interface RatingPartial extends Partial<Rating> {}
export interface ProductPartial extends Partial<ProductI> {}
