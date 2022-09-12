import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/system';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import s from './Card.module.css';
import { ProductPartial } from '../../sehostypes/Product';
import React, { useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import Zoom from '@mui/material/Zoom';
import { useDispatch, useSelector } from 'react-redux';
import { addToLocalCart, CartI, updateQuantity } from '../../features/cart/CartSlice';
import { RootState } from '../../store';
import toast, { Toaster } from 'react-hot-toast';
import { PublicRoutes } from '../../routes/routes';
import { useAuth } from '../../hooks/useAuth';
import { getApiUserCart, setApiUserCart } from '../../features/cart/cartApiSlice';
import { CircularProgress } from '@mui/material';
/* const styles = {
  tr: {
    backgroundColor: 'white',
    '&:hover': {
     boxShadow: 'rgba(0, 0, 0, 0.50) 0px 54px 55px' 
}
    }
  } */

const Shoe: React.FC<ProductPartial> = props => {
  const navigate = useNavigate();
  let titulo;
  const dispatch = useDispatch();
  const dispatchAsync: any = useDispatch()
  const user = useAuth()
  const userInfo = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo') as string) : null
  const added = useSelector((state:RootState) => user.user ? state.apiCart : state.cart)

  const cartProduct:CartI = {
    idUser: user.user ? userInfo.id : null,
    idProduct: props.id,
    image: props.details?.images[0].image,
    name: props.name,
    color: props.details?.color.color,
    size: props.details?.sizes,
    price: props.sell_price,
    quantity: 1
  }
  
  props.name !== undefined &&
    (props.name.length >= 35
      ? (titulo = props.name.slice(0, 30 - props.name.length) + '...')
      : (titulo = props.name));

  const updateCart = async () => {
    if(!user.user) {
      if (!added.products.length) {
        dispatch(addToLocalCart(cartProduct))
        toast.success(<b>Product added!!</b>);
      } else {
        const finded = added.products.find((el: { idProduct: number | undefined; }) => el.idProduct === cartProduct.idProduct)
        if(finded) {
          dispatch(updateQuantity({method:'increase', id: props.id ? props.id : 0}))
          toast.success(<b>Correctly updated amount!</b>);
        } else {
          dispatch(addToLocalCart(cartProduct))
          toast.success(<b>Product added!!</b>);
        }
      }
    } else {
      await dispatch(getApiUserCart(userInfo.id))
      if (!added.products.length) {
        dispatchAsync({id: userInfo.id, products: cartProduct , token: user.token})
        toast.success(<b>Product added!!</b>);
      } else {
        console.log(added)
        const finded = added.products.find((el: { idProduct: number | undefined; }) => el.idProduct === cartProduct.idProduct)
        if(finded) {
          toast.success(<b>Correctly updated amount!</b>);
        } else {
          dispatchAsync(setApiUserCart({id: userInfo.id, products: cartProduct , token: user.token}))
          toast.success(<b>Product added!!</b>);
        }
      }
    }
  }

  return (
    <>
      <Toaster position='bottom-left' reverseOrder={false} />

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

        {/* <Typography variant="body1" color="text.primary">
          {titulo}
        </Typography> */}
        {props.details?.images !== undefined && <img src={props.details?.images[0].image} className={s.image} />}
        {/* <CardMedia color='inherit'
        component="img"
        height="180"
        image= {props.image}

        alt="Que zapato!"
      /> */}
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
            onClick={updateCart}>
            {added.loading ? 
            <CircularProgress color="inherit" />
            : 
            <AddShoppingCartIcon/>}
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};



export default Shoe;

/* 
import * as React from 'react';

import Typography from '@mui/material/Typography';

export default function MouseOverPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        Hover with a Popover.
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>I use Popover.</Typography>
      </Popover>
    </div>
  );
} */
