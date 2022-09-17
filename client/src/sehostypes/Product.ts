export interface UserI {
  id: number | string;
}

export interface Color {
  id: number,
  color: string,
  isActive: boolean
}

export interface Images {
  id: string 
  image: string;
}

export interface Size {
  id: number,
  size: string,
  stock: number,
  isActive: boolean
}

export interface Details {
  color?: Color;
  images?: Images[];
  sizes?: Size[];
  isActive?: boolean
}

export interface Rating {
  id: number;
  id_user: number;
  review: string
  rate: number;
  date: string;
  isActive: boolean;
}
export interface Category {
  id: number,
  category: string,
  isActive: boolean
}
export interface ProductI {
  "id": number;
  "name": string;
  "description": string;
  "gender": string;
  "season": string;
  "rate_average": string;
  "buy_price": number;
  "sell_price": number;
  "sold": number;
  "Category": Category;
  "reviews": Rating[]
  "details"?: Details
}
export interface Pricing {
  base: number,
  top: number
}

export interface Filter {
  clave: string,
  valor: any
}

// DTO Data Transfer Object : interfaces creadas a partir de una intefaz para manejo de datos
export interface RatingPartial extends Partial<Rating> {}
export interface ProductPartial extends Partial<ProductI> {}
