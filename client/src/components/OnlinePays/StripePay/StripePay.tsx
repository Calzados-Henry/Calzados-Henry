import { useState } from 'react';
import { Button, Container, Grid, Box, Typography } from '@mui/material';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { usePayMutation } from '@/features/stripe/stripeApiSlice';
import { currencyFormatter } from '@/utils/currencyFormat';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import master from '../assets/mc_symbol.svg';
import visa from '../assets/Visa_Brandmark_Blue_RGB_2021.png';
import './StripePay.css';
import axios from 'axios';

const stripePromise = loadStripe(
  'pk_test_51LfVUnFIsWfnWFQTkVCR6LCVq3LkYSqRmo3KUnNHlQUGPLP7Gl7L835tbr8EddkHbjlL74NIGmQPNUC6uiRVLkE300QwVewHnV',
);
// 5200828282828210 card / 3 digitos / fecha futura
/* OTHER COMPONENT */
export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  /*  */

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const dataStripe = await stripe?.createPaymentMethod({
      type: 'card',
      card: elements?.getElement(CardElement),
    });
    setLoading(true);
    if (!dataStripe?.error) {
      const id = dataStripe?.paymentMethod?.id;
      try {
        const { data, status } = await axios.post('http://localhost:3001/api/checkout', {
          id,
          amount: 12300, //cents
        });
        data ? console.log(data) : console.log(status);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const appearance = {
    theme: 'stripe',
  };

  return (
    <Container maxWidth={'100%'}>
      <form onSubmit={handleSubmit}>
        <Typography variant='h6' textAlign={'center'}>
          Card payment
        </Typography>
        <Grid container alignItems={'center'} display={'grid'} gridTemplateColumns='1fr 1fr'>
          <Grid item alignContent={'center'}>
            <img src={master} className='creditCard' alt='logo' />
          </Grid>
          <Grid item alignContent={'center'}>
            <img src={visa} className='creditCard' alt='logo' />
          </Grid>
        </Grid>
        {/*  */}
        <CardElement id='card-element' />
        {/*  */}
        <Button
          startIcon={<CreditCardOutlinedIcon></CreditCardOutlinedIcon>}
          type='submit'
          color='inherit'
          variant='outlined'
          disabled={!stripe || loading}
          fullWidth>
          {loading ? <span>Loading...</span> : 'Fast Pay'}
        </Button>
        <Typography fontWeight={100}>Payment with debit or credit card</Typography>
      </form>
    </Container>
  );
};

/* MAIN COMPONENT */
export default function StripePay() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
