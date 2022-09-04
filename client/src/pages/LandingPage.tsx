import Carrousel from '../components/Carrousel/Carrousel';
import PromotionalList from '../components/PromotionalProducts/PromotionalList';
import InfoBlogs from '../components/InfoBlogs/InfoBlogs';
import ProductApi from '../features/product/ProductList';
import s from './css.module.css';

export default function LandingPage() {
  return (
    <>
      <Carrousel></Carrousel>
      <PromotionalList></PromotionalList>
      <InfoBlogs></InfoBlogs>
      {/* <ProductApi></ProductApi> */}
    </>
  );
}
