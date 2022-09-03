import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '../Card/Card';
import { useGetProductsQuery } from '../../features/product/productApiSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(1),
  height: 300,
  // ...theme.typography.body2,
  // padding: theme.spacing(1),
  // textAlign: 'center',
  // color: theme.palette.text.secondary,
}));

export default function PromotionalList() {
  const { data, error, isLoading, isSuccess } = useGetProductsQuery();

  return (
    <Box mt={3} sx={{ flexGrow: 1 }}>
      <Typography
        variant='h4'
        gutterBottom
        textAlign={'center'}
        sx={{ borderBottom: '2px dotted gray' }}>
        Surprise Shoes
      </Typography>
      <Grid container spacing={2} mb={2}>
        {data?.slice(0, 3).map(shoe => {
          return (
            <Grid key={shoe.id} item xs={4}>
              <Card id={shoe.id} title={shoe.title} image={shoe.image} price={shoe.price}></Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
