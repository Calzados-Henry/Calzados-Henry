import { setApiUserCart, updateApiUserCart } from '@/features/cart/cartApiSlice';
import { useAuth } from '@/hooks/useAuth';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { Backdrop, Button, CircularProgress, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import React, { lazy, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToLocalCart, CartI, updateLocalCart } from '../../features/cart/CartSlice';
import { RootState } from '../../store';
import Description from './description/Description';
import Sizes from './sizes/Sizes';
// import { ProductPartial } from '@/sehostypes/Product';
import { useGetProductQuery } from '@/features';
import { resetProduct, setProduct } from '@/features/product/productSlice';
import { PublicRoutes } from '@/routes/routes';
import Swal from 'sweetalert2';

const Photos = lazy(() => import('./photos/Photos'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function ProductDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();  
  const { user, id: userId } = useAuth();
  const {products, loading} = useSelector((state: RootState) => (user ? state.apiCart : state.cart));
  const [sizeValue, setSizeValue] = React.useState( { 
    value: ''
  });
  
  const shoe = useSelector((state: RootState) => state.products.product)
  const findedProduct = products.find((el: CartI) => el.idProduct?.toString() === params.id)
  const cartProduct:CartI = {
    idUser: user ? userId : null,
    idProduct: shoe.id,
    image: shoe?.details?.images ? shoe.details.images[0].image : undefined,
    name: shoe.name,
    color: shoe?.details?.color?.color,
    size: shoe.details?.sizes,
    sizeCart: user ? undefined : shoe.details?.sizes && shoe.details.sizes[shoe.details?.sizes?.length - 1],
    price: shoe.sell_price,
    quantity: 1,
  };
  const maxGralStock = !user ? cartProduct?.sizeCart?.stock && findedProduct?.quantity && (cartProduct.sizeCart.stock - findedProduct.quantity) : findedProduct?.sizeCart?.stock && findedProduct.quantity && (findedProduct.sizeCart.stock - findedProduct.quantity);
  
  const {data, isLoading} = useGetProductQuery(params.id)
    const updateList =  () => {
    data !== undefined && dispatch(setProduct(data));
  };
  const reset = () => {
    dispatch(resetProduct())
  }
  useEffect(() => {
    updateList();
  }, [data, shoe.id]);

useEffect(() => {
    return reset()
    
  },[])
 
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(!user) {
        if(findedProduct) {
          const maxStock = cartProduct?.sizeCart?.stock && findedProduct.quantity && (cartProduct.sizeCart.stock - findedProduct.quantity)
          if(maxStock === 0) {
            Swal.fire({
              title: 'Wait!',
              icon: 'error',
              text: "you already have all stock available",
              showConfirmButton: true
            })
          } else {
            dispatch(updateLocalCart({method:'increase', id: shoe.id ? shoe.id : 0, sizes: {}}))
            toast.success(<b>Correctly updated amount!</b>);
          }
        } else {
          dispatch(addToLocalCart(cartProduct))
          Swal.fire({
            icon: 'success',
            text: "Product added successfully",
            showConfirmButton: true
          })
        }
    } else {
        if(findedProduct) {
          const maxStock = findedProduct?.sizeCart?.stock && findedProduct.quantity && (findedProduct.sizeCart.stock - findedProduct.quantity)
          if(maxStock === 0) {
            Swal.fire({
              title: 'Wait!',
              icon: 'error',
              text: "you already have all stock available",
              showConfirmButton: true
            })
          } else {
            let updatedQuantity: number | undefined;
            Swal.fire({
              title: 'Wait! that products is already on your cart, we will add this',
              html: `<p>Current Available Stock: ${maxStock}</p>` + `<p>Current Selected Size: ${findedProduct.sizeCart?.size}</p>`,
              input: 'number',
              inputAttributes: {
                autocapitalize: 'off',
                max:`${maxStock}`,
              },
              showCancelButton: true,
              confirmButtonText: 'Update',
              showLoaderOnConfirm: true,
              preConfirm: (quantity) => {
                updatedQuantity =  cartProduct.quantity && (cartProduct.quantity + Number(quantity))
                },
                allowOutsideClick: () => !Swal.isLoading()
              }).then(async (result) => {
                if (result.isConfirmed) {
                  await dispatch(updateApiUserCart({idUser: userId, idProduct: cartProduct.idProduct , quantity: updatedQuantity}))
                  Swal.fire({
                    icon: 'success',
                    text: "Amount updated successfully",
                    showConfirmButton: true
                  })
              }
            })          
          }
        } else {
            if(sizeValue.value !== '') {
              const sizeFinded = cartProduct?.size?.find(el => el.size === sizeValue.value)
              cartProduct.size && await dispatch(setApiUserCart({id: userId, products: cartProduct, id_size: sizeFinded?.id, token: user.token}))
              Swal.fire({
                icon: 'success',
                text: "Product added successfully",
                showConfirmButton: true
              })
            } else {
              Swal.fire({
                title: 'We need more information',
                icon: 'error',
                text: 'please select one size'
              })
            }
          }
      }
  }

  return (
    <Box minHeight='60vh'>
        <Toaster containerStyle={{position: 'absolute', top:'50%', left:'30%'}}/>
        {(isLoading || loading) && 
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={true}
                ><CircularProgress color="inherit" size={200}/></Backdrop>}
      <Container maxWidth='xl'>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {shoe.details !== undefined && <Photos details={shoe.details}></Photos>}
          </Grid>
          <Grid item xs={6}>
            <Description
              name={shoe?.name}
              description={shoe?.description}
              sell_price={shoe?.sell_price}
              ></Description>
            {findedProduct && 
            <Box>
              <Typography variant='h5' component='h2' pt={1}>Current Selected Size: {findedProduct?.sizeCart?.size}</Typography>
              <Typography variant='h5' component='h2' pt={1}>Current Avalable Stock: {maxGralStock}</Typography>
            </Box>
            }
            {!findedProduct && <Sizes sizes={shoe?.details?.sizes} updateSizes={(newValue: string) => setSizeValue({value: newValue}) }/>}
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

        <Reviews />
      </Container>
    </Box>
  );
}
