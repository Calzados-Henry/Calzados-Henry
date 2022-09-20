import { Box, Button, Typography } from '@mui/material';
import s from './OnlinePays.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import * as React from 'react';
import { Container, ListItemText, ListItemIcon, ListItemButton, List, ListSubheader} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { ViewList, ExpandLess, ExpandMore, DeliveryDining } from '@mui/icons-material';
import StripePay from './StripePay/StripePay';
import { useGetAddressQuery } from '@/features';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from "../../routes/routes"


export default function OnlinePays() {
  const currentUser = useSelector((state:RootState) => state.user)
  const currentCart = useSelector((state:RootState) => state.apiCart)
  const navigate = useNavigate()
  const {data: addresses, isLoading} = useGetAddressQuery()
  const deliveryAddress = JSON.parse(window.localStorage.getItem('deliveryAddress') as string)
  const [openCart, setOpenCart] = React.useState(false);
  const [openDelivery, setOpenDelivery] = React.useState(false);
  const [openPayment, setOpenPayment] = React.useState(true);

  const handleClick = (method:string) => {
    if(method === 'cart') setOpenCart(!openCart);
    if(method === 'delivery') setOpenDelivery(!openDelivery);
    if(method === 'payment') setOpenPayment(!openPayment);
  };

  return (
    <Container>
      <Box gridColumn={'span 1'} display='flex' flexDirection={'column'} justifyContent={'center'} padding={2} sx={{border:'1px solid #5d3a00', borderRadius:5, maxWidth: 340}}>
        <Typography variant='h5' gutterBottom>Order Summary</Typography>
        <Typography variant='h6'>Products({currentCart?.products.length})</Typography>
        <Typography variant='h6'>Total: $ {currentCart?.total}</Typography>
      </Box>
      <Button sx={{position:'absolute', top:'8.5%', right: '30%'}} variant='contained' onClick={() => navigate(PublicRoutes.cart)}>Back</Button>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton sx={{maxWidth: 390}} onClick={() => handleClick('payment')}>
          <ListItemIcon>
            <ViewList />
          </ListItemIcon>
          <ListItemText primary="Payment Methods" />
          {openPayment ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openPayment} timeout="auto" unmountOnExit sx={{margin: 0, display:'flex', justifyContent:'flex-start' }}>
              <StripePay></StripePay>
        </Collapse>
        <ListItemButton sx={{maxWidth: 390}} onClick={() => handleClick('cart')}>
          <ListItemIcon>
            <ViewList />
          </ListItemIcon>
          <ListItemText primary="Order Details" />
          {openCart ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openCart} timeout="auto" unmountOnExit>
          <ListSubheader component="div" id="nested-cart-subheader">
            {currentUser.name} {currentUser.last_name} confirmed cart
          </ListSubheader>
          <Box sx={{ width: '100%' }}>
            <Box display={'grid'} gridTemplateColumns='1.3fr 0.7fr' gap={2}>
              <Box gridColumn={'span 1'}>
                <Header></Header>
                {currentCart?.products.map(product => 
                  <Item
                    key={product.idProduct}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    cant={product.quantity}></Item>
                )}
                <Footer total={currentCart.total}></Footer>
                </Box>
              </Box>
            </Box>
        </Collapse>
        <ListItemButton sx={{maxWidth: 390}} onClick={() => handleClick('delivery')}>
          <ListItemIcon>
            <DeliveryDining/>
          </ListItemIcon>
          <ListItemText primary="Delivery Details"/>
          {openDelivery ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openDelivery} timeout="auto" unmountOnExit>
          <ListSubheader component="div" id="nested-delivery-subheader">
            {currentUser.name} {currentUser.last_name} confirmed address
          </ListSubheader>
          <Box sx={{ width: '100%', display:'flex', alignItems:'center', gap:10}}>
            <Typography>{deliveryAddress?.address} - {deliveryAddress?.city},{deliveryAddress?.state}</Typography>
            <Button variant='contained'>Change</Button>
          </Box>
        </Collapse>
      </List>
    </Container>
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
        <Box></Box>
        <Box textAlign={'center'}></Box>
        <Box width={'100%'}>
          <Typography textAlign={'left'}>$ {props.total}</Typography>
        </Box>
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
        <Box>
          <Typography textAlign={'center'}>Cant</Typography>
        </Box>
        <Box></Box>
        <Box width={'100%'}>
          <Typography textAlign={'left'}>Price</Typography>
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
      <Box>
        <Typography textAlign={'center'}>{props.cant}</Typography>
      </Box>
      <Box></Box>
      <Box width={'100%'}>
        <Typography textAlign={'left'}>$ {props.price}</Typography>
      </Box>
    </Box>
  );
};
