import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '../Card/Card';
import { useGetProductsQuery } from '../../features/product/productApiSlice';

export default function PromotionalList() {
  const { data, error, isLoading, isSuccess } = useGetProductsQuery();

  let content;
  if (isLoading) content = <h1>Loading...</h1>;
  if (data)
    content = (
      <Grid container spacing={2} mb={2}>
        {data
          ?.filter(shoe => shoe.price >= 2120)
          .map(shoe => {
            return (
              <Grid key={shoe.id} item xs={4}>
                {shoe.name !== undefined && (
                  <Card
                    id={shoe.id}
                    name={shoe.name}
                    images={shoe.images}
                    price={shoe.price}></Card>
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
