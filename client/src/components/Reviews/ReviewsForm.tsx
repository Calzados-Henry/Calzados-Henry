export interface ReviewsI {
  id_product: number;
  id_user: number;
  review: string;
  rate: number;
  date: Date;
  isActive: boolean;
}

export default function ReviewsForm() {
  return <div>ReviewsForm</div>;
}
