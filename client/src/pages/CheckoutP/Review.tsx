import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import StripePay from '@/components/OnlinePays/StripePay/StripePay';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { currencyFormatter } from '@/utils/currencyFormat';
import { setTotalCart } from '@/features/checkout/checkoutSlice';

export default function Review() {
  /* ------------------------------------------ */
  const products = useSelector((state: RootState) => state.cart);
  const shipping = useSelector((state: RootState) => state.checkout);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let parcial = 0;
    products.forEach((p: { price: number; quantity: number }) => {
      parcial += p.price * p.quantity;
    });
    setTotal(parcial);
    dispatch(setTotalCart(parcial));
  });

  /* ------------------------------------------ */
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products?.map(product => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={'Quantity ' + product.quantity} />
            <Typography mr={12} variant='body2'>
              {currencyFormatter.format(product.price)}
            </Typography>
            <Typography variant='body2'>
              {currencyFormatter.format(product.price * product.quantity)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Shipping' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            {currencyFormatter.format(shipping.delivery.price)}
          </Typography>
        </ListItem>{' '}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Taxes' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            {currencyFormatter.format(total * 0.19)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            {currencyFormatter.format(total + shipping.delivery.price * 1.19)}
          </Typography>
        </ListItem>
      </List>

      {/* -------------------------------- */}
      {/* -------------------------------- */}
      {/* -------------------------------- */}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography
            gutterBottom>{`Name: ${shipping.stepOne.firstName} ${shipping.stepOne.lastName}`}</Typography>
          <Typography gutterBottom>{`Address: ${shipping.stepOne.address}`}</Typography>

          <Typography
            gutterBottom>{`Location: ${shipping.stepOne.city}, ${shipping.stepOne.state}, ${shipping.stepOne.country}`}</Typography>

          <Typography gutterBottom>{`Zip Code / Postal Code: ${shipping.stepOne.zip}`}</Typography>
        </Grid>
        <Grid item container direction='column' xs={12} sm={6} minHeight={280}>
          <StripePay></StripePay>
          {/* {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))} */}
        </Grid>
      </Grid>
      {/* -------------------------------- */}
      {/* -------------------------------- */}
      {/* -------------------------------- */}
    </React.Fragment>
  );
}
