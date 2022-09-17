import { setApiUserCart, updateApiUserCart } from '@/features/cart/cartApiSlice';
import { useAuth } from '@/hooks/useAuth';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import React, { lazy, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToLocalCart, CartI, updateQuantity } from '../../features/cart/CartSlice';
import { RootState } from '../../store';
import Description from './description/Description';
import Sizes from './sizes/Sizes';
// import { ProductPartial } from '@/sehostypes/Product';
import { useGetProductQuery } from '@/features';
import { resetProduct, setProduct } from '@/features/product/productSlice';
import { PublicRoutes } from '@/routes/routes';
import Swal from 'sweetalert2';
import { addToLocalCart, CartI, updateQuantity } from '../../features/cart/CartSlice';
import Description from './description/Description';
import Sizes from './sizes/Sizes';



const Photos = lazy(() => import('./photos/Photos'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function ProductDetail() {
  const navigate = useNavigate();
  const params = useParams();
  
  const dispatch = useDispatch();
  const dispatchAsync: any = useDispatch();
  
  const { user } = useAuth();
  const userInfo: any = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo') as string) : null;
  // const products = useSelector((state: RootState) => state.products.allProducts);
  const added = useSelector((state: RootState) => (user ? state.apiCart : state.cart));
  
  const {data} = useGetProductQuery(params.id)
    const updateList =  () => {
    data !== undefined && dispatch(setProduct(data));
  };
  const reset = () => {
    dispatch(resetProduct())
  }

  const shoe = useSelector((state: RootState) => state.products.product)
  useEffect(() => {
  updateList();
    
  },[data, shoe.id])

useEffect(() => {
    return reset()
    
  },[])
 
  
  const cartProduct:CartI = {
    idUser: user.user ? userInfo.id : null,
    idProduct: shoe.id,
    image: shoe?.details?.images ? shoe.details.images[0].image : undefined,
    name: shoe.name,
    color: shoe?.details?.color?.color,
    size: shoe.details?.sizes,
    price: shoe.sell_price,
    quantity: 1,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) {
      if (!added.products.length) {
        dispatch(addToLocalCart(cartProduct));
        toast.success(<b>Product added!!</b>);
      } else {
        const finded = added.products.find((el: CartI) => el.idProduct === cartProduct.idProduct);
        if (finded) {
          dispatch(updateQuantity({ method: 'increase', id: params.id ? Number(params.id) : 0 }));
          toast.success(<b>Correctly updated amount!</b>);
        } else {
          dispatch(addToLocalCart(cartProduct));
          toast.success(<b>Product added!!</b>);
        }
      }
    } else {
      if (!added.products.length) {
        dispatch(setApiUserCart({ id: userInfo.id, products: cartProduct, token: user.token }));
        toast.success(<b>Product added!!</b>);
      } else {
        const finded = added.products.find((el: CartI) => el.idProduct === cartProduct.idProduct);
        if (finded) {
          const maxStock =
            cartProduct.size &&
            cartProduct.size[0].stock &&
            cartProduct.size[0].stock - finded.quantity;
          if (!maxStock) {
            Swal.fire({ icon: 'error', text: 'No more products in stock!' });
          } else {
            Swal.fire({
              title: 'Wait! that products is already on your cart, we will add this',
              text: `Current Stock (realStock - cartStock): ${maxStock}`,
              input: 'number',
              inputAttributes: {
                autocapitalize: 'off',
                max: `${maxStock}`,
              },
              showCancelButton: true,
              confirmButtonText: 'Update',
              showLoaderOnConfirm: true,
              preConfirm: (quantity: number) => {
                const updatedQuantity = finded?.quantity + Number(quantity);
                dispatch(
                  updateApiUserCart({
                    idUser: userInfo.id,
                    idProduct: cartProduct.idProduct,
                    quantity: updatedQuantity,
                  }),
                ).catch((error: Error) => Swal.showValidationMessage(`Request failed: ${error}`));
              },
              allowOutsideClick: () => !Swal.isLoading(),
            }).then(result => {
              if (result.isConfirmed) {
                Swal.fire({
                  icon: 'success',
                  text: 'Correctly updated amount!, you will be redirect',
                  timer: 1500,
                });
                setTimeout(() => {
                  navigate(PublicRoutes.cart);
                }, 2000);
              }
            });
          }
        } else {
          await dispatchAsync(
            setApiUserCart({ id: userInfo.id, products: cartProduct, token: user.token }),
          );
          toast.success(<b>Product added!!</b>);
        }
      }
    }
  };

  return (
    <Box minHeight='60vh'>
      <Container maxWidth='xl'>
        <Toaster position='bottom-left' />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {shoe.details !== undefined && <Photos details={shoe.details}></Photos>}
          </Grid>
          <Grid item xs={6}>
            <Description
              name={shoe?.name}
              description={shoe?.description}
              sell_price={shoe?.sell_price}></Description>
            <Sizes sizes={shoe?.details?.sizes} />

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
                onClick={() => navigate(PublicRoutes.cart)}
                sx={{ width: '100%', marginBottom: 2 }}
                startIcon={<ShoppingCartCheckoutOutlinedIcon />}>
                GO TO CART
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Reviews></Reviews>
      </Container>
    </Box>
  );
}
