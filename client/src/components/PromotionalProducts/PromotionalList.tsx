import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '../Card/Card';
import { useGetProductsQuery } from '../../features/product/productApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../features/product/productSlice';

let products: any = [];
export default function PromotionalList() {
  const selector = useSelector(state => state.products.allProducts);
  const { data, isError, isLoading, isSuccess } = useGetProductsQuery();
  const dispatch = useDispatch();

  const updateList = () => {
    products = data;
    dispatch(setProducts(products));
  };


  let content;
  if (isLoading) content = <h1>Loading...</h1>;
  if (data) updateList();
  content = (
    <Grid container spacing={2} mb={2}>
      {selector
        ?.filter(shoe => shoe.sell_price <= 290)
        .map(shoe => {
          return (
            <Grid key={shoe.id} item xs={4}>
              {shoe.name !== undefined && (
                <Card id={shoe.id} name={shoe.name} description={shoe.description} details={shoe.details} sell_price={shoe.sell_price}></Card>
              )}
            </Grid>
          );
        })}
    </Grid>
  );

  return (
    <Box mt={3} sx={{ flexGrow: 1 }}>
      <Typography
        variant='h4'
        gutterBottom
        textAlign={'center'}
        sx={{ borderBottom: '2px dotted gray' }}>
        Popular now
      </Typography>
      {content}
    </Box>
  );
}
