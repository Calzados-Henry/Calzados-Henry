import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '../Card/Card';
import { useGetProductsQuery } from '../../features/product/productApiSlice';
import { useDispatch } from 'react-redux';
import { setProducts } from '../../features/product/productSlice';
import { Toaster } from 'react-hot-toast';

export default function PromotionalList() {
  let products: any = [];
  const { data, isError, isLoading, isSuccess } = useGetProductsQuery();
  const dispatch = useDispatch();
  const [touched, setTouched] = useState('')

  useEffect(() => {
    products = data;
    dispatch(setProducts(products));
  }, [data])
  


  let content;
  if (isLoading) content = <h1>Loading...</h1>;
  content = (
    <Grid container spacing={2} mb={2}>
      {data
        ?.filter((shoe: any) => shoe.sell_price <= 290)
        .map((shoe: any) => {
          return (
            <Grid key={shoe.id} item xs={4}>
              {shoe.name !== undefined && (
                <Card id={shoe.id} name={shoe.name} description={shoe.description} details={shoe.details} sell_price={shoe.sell_price} addTouched={(value: string) => {setTouched(value)}}></Card>
              )}
            </Grid>
          );
        })}
    </Grid>
  );

  const leftToast = document.getElementById(touched)?.getBoundingClientRect()?.x
  const topToast = document.getElementById(touched)?.getBoundingClientRect()?.top

  return (
    <Box mt={3} sx={{ flexGrow: 1 }}>
      <Typography
        variant='h4'
        gutterBottom
        textAlign={'center'}
        sx={{ borderBottom: '2px dotted gray' }}>
        Popular now
      </Typography>
      <Toaster
          toastOptions={{duration: 500}}
          containerStyle={{position:'fixed', top: topToast && (topToast + 30), left: leftToast && (leftToast - 150), inset:'unset', width:300}}
        />
      {content}
    </Box>
  );
}
