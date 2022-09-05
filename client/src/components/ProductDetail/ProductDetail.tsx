import Box from '@mui/material/Box';
/* 
import styles from './ProductDetail.module.css';
import Sizes from './sizes/Sizes';
import Cant from './cant/Cant'; */
// import Ratings from './ratings/Ratings';
import Photos from './photos/Photos';
import Description from './description/Description';
// import ProductModal from './ProductModal';
import { useGetProductsQuery } from '../../features/product/productApiSlice';
import { useParams, useLocation } from 'react-router-dom';
import Reviews from '../Reviews/Reviews';
import { useEffect } from 'react';
import { Container } from '@mui/system';
import { Grid, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { addToCart } from '../../features/cart/CartSlice';

// import { ProductPartial } from '../Card/product.model';

export default function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.allProducts);
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

          {/*  */}
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
              onClick={() => dispatch(addToCart(shoe))}
              startIcon={<AddShoppingCartIcon />}>
              ADD TO CART
            </Button>
            <Button
              variant='outlined'
              size='large'
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
