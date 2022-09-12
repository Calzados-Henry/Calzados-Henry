import { useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import master from '../assets/mc_symbol.svg';
import visa from '../assets/Visa_Brandmark_Blue_RGB_2021.png';
import { stripePublicKey } from '@/utils/utils';
import { RootState } from '@/store';
import axios from 'axios';
import './StripePay.css';
import Swal from 'sweetalert2';

const stripePromise = loadStripe(stripePublicKey);

// 5200828282828210 card / 3 digitos / fecha futura
/* OTHER COMPONENT */
export const CheckoutForm = () => {
  const stripe = useStripe();
  const price = useSelector((state: RootState) => state.checkout.totalCart);
  const elements = useElements();
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
          amount: price * 100, // cents
        });
        data && data.status === 'succeeded'
          ? Swal.fire({
              icon: 'success',
              title: 'Your payment was received successfully',
              confirmButtonColor: '#412800',
              showConfirmButton: true,
            })
          : Swal.fire({
              icon: 'error',
              title: 'Your payment was declined',
              text: 'Contact your bank and try again',
              confirmButtonColor: '#412800',
              showConfirmButton: true,
            });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Your payment was declined',
          text: 'Contact your bank and try again',
          confirmButtonColor: '#412800',
          showConfirmButton: true,
        });
      }
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={'xl'}>
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
