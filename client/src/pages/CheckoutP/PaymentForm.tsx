import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, Fragment } from 'react';
import { useAppDispatch } from '../../features/hooks';
import { resetCheck } from '../../features/checkout/checkoutSlice';
import { CardCvcElement, CardNumberElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { StripePay } from './Stripe';

export default function PaymentForm() {
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log('aca estoy');
    console.log(e.target.value);
  };
  return (
    <Fragment>
      <Typography variant='h6' gutterBottom>
        Payment Data
      </Typography>
      <StripePay></StripePay>
    </Fragment>
  );
}
