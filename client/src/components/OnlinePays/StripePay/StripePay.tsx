import { useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import master from '../assets/mc_symbol.svg';
import visa from '../assets/Visa_Brandmark_Blue_RGB_2021.png';
import { stripePublicKey } from '@/utils/utils';
import axios from 'axios';
import './StripePay.css';
import Swal from 'sweetalert2';
import { useAuth } from '@/hooks/useAuth';

const stripePromise = loadStripe(stripePublicKey);

// 5200828282828210 card / 3 digitos / fecha futura
/* OTHER COMPONENT */
export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();
  const deliveryAddress = JSON.parse(window.localStorage.getItem('deliveryAddress') as string)

  /*  */

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const successPayment = () => {
      Swal.fire({
        icon: 'success',
        title: 'Your payment was received successfully',
        confirmButtonColor: '#412800',
        showConfirmButton: true,
      });
      axios.post('http://localhost:3001/email', {
        email: user,
        subject: 'Sehos Store Purchase',
        content: 'Your payment was received successfully! ',
      });
    };

    
    const dataStripe = await stripe?.createPaymentMethod({
      type: 'card',
      card: elements?.getElement(CardElement),
    });
    setLoading(true);
    if (!dataStripe?.error) {
      const idStripe = dataStripe?.paymentMethod?.id;
      try {
        const { data, status } = await axios.post('http://localhost:3001/orders', {
          idStripe,
          idAddress: deliveryAddress.id
        }, {
          headers: {
              'Authorization': `bearer ${token}`
          }
        });
        data && data.status === 'succeeded'
          ? successPayment()
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
    <Container sx={{width:'500px', margin: 0}}>
      <form onSubmit={handleSubmit}>
        <Typography variant='h6' textAlign={'center'}>
        Payment with debit or credit card
        </Typography>
        <Grid container alignItems={'center'} justifyContent='center'>
            <img src={master} className='creditCard' alt='logo' />
            <img src={visa} className='creditCard' alt='logo' />
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
