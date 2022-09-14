import React from 'react';
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
import { addToLocalCart, CartI, updateQuantity } from '../../features/cart/CartSlice';
import { setApiUserCart } from '../../features/cart/cartApiSlice';

interface Props extends ProductPartial {
  addTouched: Function
}

const Shoe: React.FC<Props> = props => {
  const navigate = useNavigate();
  let titulo;
  const dispatch = useDispatch();
  const dispatchAsync: any = useDispatch()
  const user = useAuth()
  const userInfo = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo') as string) : null
  const {products, loading} = useSelector((state:RootState) => user.user ? state.apiCart : state.cart)

  const cartProduct:CartI = {
    idUser: user.user ? userInfo.id : null,
    idProduct: props.id,
    image: props?.details?.images ? props.details.images[0].image : undefined,
    name: props.name,
    color: props?.details?.color?.color,
    size: props.details?.sizes,
    price: props.sell_price,
    quantity: 1
  }
  
  props.name !== undefined &&
    (props.name.length >= 35
      ? (titulo = props.name.slice(0, 30 - props.name.length) + '...')
      : (titulo = props.name));

  const updateCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.addTouched(e.currentTarget.id)
    if(!user.user) {
      if (!products.length) {
        dispatch(addToLocalCart(cartProduct))
        toast.success(<b>Product added!!</b>);
      } else {
        const finded = products.find((el: CartI) => el.idProduct === cartProduct.idProduct)
        if(finded) {
          dispatch(updateQuantity({method:'increase', id: props.id ? props.id : 0}))
          toast.success(<b>Correctly updated amount!</b>);
        } else {
          dispatch(addToLocalCart(cartProduct))
          toast.success(<b>Product added!!</b>);
        }
      }
    } else {
      if (!products.length) {
        dispatchAsync(setApiUserCart({id: userInfo.id, products: cartProduct , token: user.token}))
        toast.success(<b>Product added!!</b>);
      } else {
        const finded = products.find((el: CartI) => el.idProduct === cartProduct.idProduct)
        if(finded) {
          toast.success(<b>Correctly updated amount!</b>);
        } else {
          await dispatchAsync(setApiUserCart({id: userInfo.id, products: cartProduct , token: user.token}))
          toast.success(<b>Product added!!</b>);
        }
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
