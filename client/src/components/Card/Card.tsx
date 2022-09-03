import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import s from './Card.module.css';
import { ProductPartial } from './product.model';
import React from 'react';
import { Link } from 'react-router-dom';

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

  props.title !== undefined &&
    (props.title.length > 40
      ? (titulo = props.title.slice(0, 30 - props.title.length) + '...')
      : (titulo = props.title));
  return (
    <>
      <Card
        sx={{ maxWidth: 345 }}
        style={{
          height: '60vh',
          width: '50vw',
          display: 'flex',
          flexDirection: 'column',
          borderStyle: 'solid',
          borderColor: 'transparent',
          marginLeft: '20px',
          marginTop: '20px',
        }}>
        <Link to={`/products/${props.id}`}>
          <CardHeader
            color='inherit'
            titleTypographyProps={{ fontSize: 18 }}
            title={titulo}
            subheader='Que Copado es este producto!'
            sx={{ cursor: 'pointer' }}
          />
        </Link>

        {/* <Typography variant="body1" color="text.primary">
          {titulo}
        </Typography> */}
        <img src={props.image} className={s.image} />
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
          <IconButton color='inherit' aria-label='add to cart'>
            <AddShoppingCartIcon></AddShoppingCartIcon>
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Shoe;
