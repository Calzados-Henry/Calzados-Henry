import Carrousel from '../../components/Carrousel/Carrousel';
import PromotionalList from '../../components/PromotionalProducts/PromotionalList';
import { lazy } from 'react';

const InfoBlogs = lazy(() => import('@/components/InfoBlogs/InfoBlogs'));

export default function LandingPage() {
  return (
    <>
      <Carrousel></Carrousel>
      <PromotionalList></PromotionalList>
      <InfoBlogs></InfoBlogs>
    </>
  );
}
