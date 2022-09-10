import { Container, Box, Grid, Typography, Button, Paper } from '@mui/material';
import { ProductData, ClientData } from './data';
import s from './OnlinePays.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import StripePay from './StripePay/StripePay';

export default function OnlinePays() {
  return (
    <Box sx={{ width: '100%' }}>
      <Box display={'grid'} gridTemplateColumns='1.3fr 0.7fr' gap={2}>
        <Box gridColumn={'span 1'}>
          <Typography variant='h4' gutterBottom>
            {ClientData.username.charAt(0).toUpperCase() + ClientData.username.slice(1)} Cart
          </Typography>
          <Header></Header>
          <Item
            image={ProductData.images[0].image}
            name={ProductData.name}
            price={ProductData.price}
            cant={1}></Item>
          <Item
            image={ProductData.images[0].image}
            name={ProductData.name}
            price={ProductData.price}
            cant={1}></Item>
          <Item
            image={ProductData.images[0].image}
            name={ProductData.name}
            price={ProductData.price}
            cant={1}></Item>
          <Footer total={ProductData.price * 3}></Footer>
        </Box>

        <Box gridColumn={'span 1'} display='grid' justifyContent={'center'}>
          <Box>
            <Typography variant='h4' gutterBottom>
              Order Summary
            </Typography>
            <Box>
              <StripePay></StripePay>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const Footer = (props: any) => {
  return (
    <>
      <Box className={s.header}>
        <Box>
          <Typography>TOTAL</Typography>
        </Box>
        <Box></Box>
        <Box width={'100%'}>
          <Typography textAlign={'right'}>$ {props.total}</Typography>
        </Box>
        <Box></Box>
        <Box textAlign={'center'}></Box>
      </Box>
    </>
  );
};

const Header = () => {
  return (
    <>
      <Box className={s.header}>
        <Box>
          <Typography>Img</Typography>
        </Box>
        <Box>
          <Typography>Title</Typography>
        </Box>
        <Box width={'100%'}>
          <Typography textAlign={'right'}>Price</Typography>
        </Box>
        <Box>
          <Typography textAlign={'center'}>Cant</Typography>
        </Box>
        <Box textAlign={'center'}>
          <Typography textAlign={'center'}>Delete</Typography>
        </Box>
      </Box>
    </>
  );
};

const Item = (props: any) => {
  return (
    <Box className={s.container}>
      <Box>
        <img className={s.image} src={props.image}></img>
      </Box>
      <Box>
        <Typography>{props.name}</Typography>
      </Box>
      <Box width={'100%'}>
        <Typography textAlign={'right'}>$ {props.price}</Typography>
      </Box>
      <Box>
        <Typography textAlign={'center'}>{props.cant}</Typography>
      </Box>
      <Box textAlign={'center'}>
        <Button>
          <DeleteIcon></DeleteIcon>
        </Button>
      </Box>
    </Box>
  );
};
