import Box from '@mui/material/Box';
import Description from './description/Description';
import { useParams } from 'react-router-dom';
import { useEffect, lazy } from 'react';
import { Container } from '@mui/system';
import { Grid, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { addToLocalCart, CartI, updateQuantity } from '../../features/cart/CartSlice';
import Sizes from './sizes/Sizes';
import toast, { Toaster } from 'react-hot-toast';
import { RootState } from '../../store';
import { useAuth } from '@/hooks/useAuth';
import { setApiUserCart, getApiUserCart } from '@/features/cart/cartApiSlice';
import { RootState } from '@/store';

const Photos = lazy(() => import('./photos/Photos'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const dispatchAsync: any = useDispatch();

  const { user } = useAuth();
  const userInfo: any = window.localStorage.getItem('userInfo')
    ? JSON.parse(window.localStorage.getItem('userInfo') as string)
    : null;

  const products = useSelector((state: RootState) => state.products.allProducts);

  const shoe = products.find((item: any) => parseInt(item.id) === parseInt(params.id));
  const added = useSelector((state: RootState) => (user ? state.apiCart : state.cart));

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

  const updateCart = async () => {
    if (!user) {
      if (!added.products.length) {
        dispatch(addToLocalCart(cartProduct));
        toast.success(<b>Product added!!</b>);
      } else {
        const finded = added.products.find(
          (el: { idProduct: number | undefined }) => el.idProduct === cartProduct.idProduct,
        );
        if (finded) {
          dispatch(updateQuantity({ method: 'increase', id: shoe.id ? shoe.id : 0 }));
          toast.success(<b>Correctly updated amount!</b>);
        } else {
          dispatch(addToLocalCart(cartProduct));
          toast.success(<b>Product added!!</b>);
        }
      }
    } else {
      await dispatch(getApiUserCart(userInfo.id));
      if (!added.products.length) {
        dispatchAsync({ id: userInfo.id, products: cartProduct, token: user.token });
        toast.success(<b>Product added!!</b>);
      } else {
        const finded = added.products.find(
          (el: { idProduct: number | undefined }) => el.idProduct === cartProduct.idProduct,
        );
        if (finded) {
          toast.success(<b>Correctly updated amount!</b>);
        } else {
          dispatchAsync(
            setApiUserCart({ id: userInfo.id, products: cartProduct, token: user.token }),
          );
          toast.success(<b>Product added!!</b>);
        }
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
