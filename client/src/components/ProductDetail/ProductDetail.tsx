/* import Box from '@mui/material/Box';
import styles from './ProductDetail.module.css';
import Sizes from './sizes/Sizes';
import Cant from './cant/Cant'; */
import AddCartButton from './addCartButton/AddCartButton';
// import Ratings from './ratings/Ratings';
import Photos from './photos/Photos';
import Description from './description/Description';
// import ProductModal from './ProductModal';
import { useGetProductsQuery } from '../../features/product/productApiSlice';
import { useParams, useLocation } from 'react-router-dom';
import Reviews from '../Reviews/Reviews';
import { useEffect } from 'react';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
// import { ProductPartial } from '../Card/product.model';

export default function ProductDetail() {
  const params = useParams();
  const { data, error, isLoading, isSuccess } = useGetProductsQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
const shoe = data?.find((item) => parseInt(item.id) === parseInt(params.id));
  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isSuccess) {
    const ratings = shoe?.rating;
    content = <></>;
  }
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Photos images={shoe?.images}></Photos>
        </Grid>
        <Grid item xs={6}>
          <Description
            title={shoe?.name}
            description={shoe?.description}
            price={shoe?.price}></Description>
          <AddCartButton></AddCartButton>
        </Grid>
      </Grid>
      <Reviews></Reviews>
    </Container>
  );
}
