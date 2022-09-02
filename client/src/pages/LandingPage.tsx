import Carrousel from '../components/Carrousel/Carrousel';
import ProductApi from '../features/product/ProductApi';

export default function LandingPage() {
  return (
    <>
      <Carrousel></Carrousel>
      <ProductApi></ProductApi>
    </>
  );
}
