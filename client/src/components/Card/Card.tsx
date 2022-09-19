import React, { useState } from 'react';
import s from './Card.module.css';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ProductPartial } from '../../sehostypes/Product';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import toast from 'react-hot-toast';
import { PublicRoutes } from '../../routes/routes';
import { useAuth } from '../../hooks/useAuth';
import { addToLocalCart, CartI, updateLocalCart } from '../../features/cart/CartSlice';
import { setApiUserCart, updateApiUserCart } from '../../features/cart/cartApiSlice';
import Swal from 'sweetalert2';
import { Icon } from '@mui/material';

interface Props extends ProductPartial {
  addTouched: Function
}

const Shoe: React.FC<Props> = props => {
  const navigate = useNavigate();
  let titulo;
  const dispatch = useDispatch();
  const user = useAuth();
  const userInfo = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo') as string) : null
  const {products, loading} = useSelector((state:RootState) => user.user ? state.apiCart : state.cart)
  const findedProduct = products.find((el: CartI) => el.idProduct === props.id)
  
 
  const cartProduct:CartI = {
    idUser: user.user ? userInfo.id : null,
    idProduct: props.id,
    image: props?.details?.images ? props.details.images[0].image : undefined,
    name: props.name,
    color: props?.details?.color?.color,
    size: props.details?.sizes,
    sizeCart: user.user ? undefined : props.details?.sizes && props.details.sizes[props.details?.sizes?.length - 1],
    price: props.sell_price,
    quantity: findedProduct?.quantity || 1
  }
  
  props.name !== undefined &&
    (props.name.length >= 35
      ? (titulo = props.name.slice(0, 30 - props.name.length) + '...')
      : (titulo = props.name));

  const updateCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.addTouched(e.currentTarget.id)
    if(!user.user) {
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
            dispatch(updateLocalCart({method:'increase', id: props.id ? props.id : 0, sizes: {}}))
            toast.success(<b>Correctly updated amount!</b>);
          }
        } else {
          dispatch(addToLocalCart(cartProduct))
          toast.success(<b>Product added!!</b>);
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
                  await dispatch(updateApiUserCart({idUser: userInfo.id, idProduct: cartProduct.idProduct , quantity: updatedQuantity}))
                  toast.success(<b>Correctly updated amount!</b>);
              }
            })          
          }
        } else {
            const options: any = {}
            cartProduct?.size?.map(p => { options[p.size ? p.size : 0] = p.size })
            Swal.fire({
            title: 'Please, set extra info',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true,
            input: 'select',
            inputOptions: options,
            inputPlaceholder: 'Please select a size',
            cancelButtonColor: '#d33'
              }).then(async (result) => {
              if (result.isConfirmed) {
                const sizeFinded = cartProduct?.size?.find(el => el.size === result.value)
                cartProduct.size && await dispatch(setApiUserCart({id: userInfo.id, products: cartProduct, id_size: sizeFinded?.id, token: user.token}))
                toast.success(<b>Product added!!</b>);
              }
          })
      }
    }
  }

  return (
    <>
      <Card
        sx={{ maxWidth: 345 }}
        className={s.card}
        style={{
          height: '55vh',
          width: '40vw',
          display: 'flex',
          flexDirection: 'column',
          borderStyle: 'solid',
          borderColor: 'transparent',
          marginLeft: '20px',
          marginTop: '20px',
        }}>
        {props.name !== undefined && (
          <Tooltip
          title={props?.name ? props.name : 'none'}
          TransitionComponent={Zoom}
          sx={{ x: 1 }}
          arrow>
            <Box>
              <CardHeader
                color='inherit'
                titleTypographyProps={{ fontSize: 18 }}
                title={titulo}
                onClick={() => navigate(`${PublicRoutes.products}/${props.id}`)}
                subheader={props.description?.slice(0,30) + '...'}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
          </Tooltip>
        )}
        {props.details?.images !== undefined && <img src={props.details?.images[0].image} className={s.image} />}
        <CardContent color='inherit'>
          <Typography variant='body2' color='text.secondary'>
            {`$ ${props.sell_price}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
          <IconButton color='inherit' aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton color='inherit' aria-label='share'>
            <ShareIcon />
          </IconButton>
          <IconButton
            color='inherit'
            aria-label='add to cart'
            id={`id${props.id}`}
            onClick={updateCart}
            disabled={loading}
            >             
            <AddShoppingCartIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};



export default Shoe;
