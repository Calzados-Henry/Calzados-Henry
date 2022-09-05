import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProductsQuery } from './productApiSlice';
import { Link } from 'react-router-dom';
import { setProducts } from './productSlice';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ProductPartial } from '../../sehostypes/Product';
import Card from '../../components/Card/Card';
import Sorting from '../../components/SideBarComponent/Sorting/Sorting';

let products: any = [];
function ProductApi() {
  const selector = useSelector(state => state.products.allProducts);
  const { data, isError, isLoading, isSuccess } = useGetProductsQuery();
  const dispatch = useDispatch();

  const updateList = () => {
    products = data;
    dispatch(setProducts(products));
  };

  let content;
  if (isLoading) content = <h2>loading....</h2>;
  if (isError) content = <h2>Ups hay un error</h2>;
  if (isSuccess) <></>;
  if (data) updateList();
  content = (
    <Grid container spacing={2} mb={2}>
      {selector?.map(shoe => {
        return (
          <Grid key={shoe.id} item xs={4}>
            {shoe.name !== undefined && (
              <Card id={shoe.id} name={shoe.name} images={shoe.images} price={shoe.price}></Card>
            )}
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <Container maxWidth='xl'>
      <Box>
        <Sorting></Sorting>
      </Box>
      {content}
    </Container>
  );
}

export default ProductApi;
