import Box from '@mui/material/Box';
import Description from './description/Description';
import { useParams } from 'react-router-dom';
import { useEffect, lazy } from 'react';
import { Container } from '@mui/system';
import { Grid, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { RootState } from '@/store';

const Photos = lazy(() => import('./photos/Photos'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function ProductDetail() {
  const params = useParams();
  const products = useSelector((state: RootState) => state.products.allProducts);
  const shoe = products.find(item => parseInt(item.id) === parseInt(params.id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Photos images={shoe?.images}></Photos>
        </Grid>
        <Grid item xs={6}>
          <Description
            name={shoe?.name}
            description={shoe?.description}
            price={shoe?.price}></Description>

          <Box
            mt={2}
            sx={{
              width: 500,
              maxWidth: '100%',
            }}>
            <Button
              variant='contained'
              size='large'
              fullWidth
              sx={{ width: '100%', marginBottom: 2 }}
              onClick={() => console.log('dispatch')}
              startIcon={<AddShoppingCartIcon />}>
              ADD TO CART
            </Button>
            <Button
              variant='outlined'
              size='large'
              color='secondary'
              fullWidth
              sx={{ width: '100%', marginBottom: 2 }}
              startIcon={<ShoppingCartCheckoutOutlinedIcon />}>
              GO TO CART
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Reviews></Reviews>
    </Container>
  );
}
