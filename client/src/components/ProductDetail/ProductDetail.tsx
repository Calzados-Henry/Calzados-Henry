import Box from '@mui/material/Box';

/* 
import styles from './ProductDetail.module.css';

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
import { addToLocalCart, CartI, updateQuantity } from '../../features/cart/CartSlice';
import Sizes from './sizes/Sizes';
import toast, { Toaster } from 'react-hot-toast';
import { RootState } from '../../store';


// import { ProductPartial } from '../Card/product.model';

export default function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.allProducts);
  const shoe = products.find((item: any) => parseInt(item.id) === parseInt(params.id));
  const added = useSelector((state: RootState) => state.cart);

  console.log(shoe);
  const cartProduct: CartI = {
    idUser: null,
    idProduct: shoe?.id,
    details: shoe?.details,
    name: shoe?.name,
    price: shoe?.sell_price,
    quantity: 1,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateCart = () => {
    if (!added.length) {
      dispatch(addToLocalCart(cartProduct));
      toast.success(<b>Product added!!</b>);
    } else {
      const finded = added.find(
        (el: { idProduct: number | undefined }) => el.idProduct === cartProduct.idProduct,
      );
      if (finded) {
        console.log('increase!');
        dispatch(updateQuantity({ method: 'increase', id: shoe.id ? shoe.id : 0 }));
        toast.success(<b>Correctly updated amount!</b>);
      } else {
        console.log('segundo add');
        dispatch(addToLocalCart(cartProduct));
        toast.success(<b>Product added!!</b>);
      }
    }
  };

  return (
    <Container maxWidth='xl'>
      <Toaster position='bottom-left' />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Photos images={shoe.details?.images}></Photos>
        </Grid>
        <Grid item xs={6}>
          <Description
            name={shoe?.name}
            description={shoe?.description}
            price={shoe?.sell_price}></Description>
          <Sizes details={shoe?.details} />

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

              onClick={updateCart}

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
