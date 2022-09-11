import React, { useEffect, Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from '../../features/hooks';
import { resetCheck } from '../../features/checkout/checkoutSlice';
import { CardCvcElement, CardNumberElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { StripePay } from './Stripe';

export default function PayMethod() {
  return <div>PayMethod</div>;
}
