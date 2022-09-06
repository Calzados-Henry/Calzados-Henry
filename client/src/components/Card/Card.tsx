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
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import Zoom from '@mui/material/Zoom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/CartSlice';
import { RootState } from '../../store';
import toast, { Toaster } from 'react-hot-toast';
/* const styles = {
  tr: {
    backgroundColor: 'white',
    '&:hover': {
     boxShadow: 'rgba(0, 0, 0, 0.50) 0px 54px 55px' 
}
    }
  } */

const Shoe: React.FC<ProductPartial> = props => {
  let titulo;
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.products.allProducts);
  const added = useSelector((state: RootState) => state.cart.products);
  const shoe = products.find((item: any) => parseInt(item.id) === parseInt(props.id));

  props.name !== undefined &&
    (props.name.length >= 35
      ? (titulo = props.name.slice(0, 30 - props.name.length) + '...')
      : (titulo = props.name));
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
        <Link to={`/products/${props.id}`}>
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
                  subheader='Que Copado es este producto!'
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            </Tooltip>
          )}
        </Link>

        {/* <Typography variant="body1" color="text.primary">
          {titulo}
        </Typography> */}
        {props.images !== undefined && <img src={props.images[0].image} className={s.image} />}
        {/* <CardMedia color='inherit'
        component="img"
        height="180"
        image= {props.image}

        alt="Que zapato!"
      /> */}
        <CardContent color='inherit'>
          <Typography variant='body2' color='text.secondary'>
            {`$ ${props.price}`}
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
            onClick={() => {
              dispatch(addToCart(shoe));

              if (added.find(el => el.id === props.id)) {
                toast.error(<b>El producto ya se encuentra en el carrito</b>);
              } else {
                toast.success(<b>Producto agregado!!</b>);
              }
            }}>
            <AddShoppingCartIcon></AddShoppingCartIcon>
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
