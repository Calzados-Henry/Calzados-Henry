import { Button, Container, Grid, Box, Typography } from '@mui/material';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { usePayMutation } from '../../../features/stripe/stripeApiSlice';
import { currencyFormatter } from '../../../utils/currencyFormat';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { useState } from 'react';
import axios from 'axios';
import './StripePay.css';
import master from '../assets/mc_symbol.svg';
import visa from '../assets/Visa_Brandmark_Blue_RGB_2021.png';

const stripePromise = loadStripe(
  'pk_test_51LfWiPB2d7giWWONJCFwX9HwqQchBoOQ5hYeVl88SUOZPxiLRUbs767EYlkywbQsEBPVRGu1URKmMn93JWltTjzQ005JqlzeEy',
);
// 5200828282828210 card / 3 digitos / fecha futura
/* OTHER COMPONENT */
export const CheckoutForm = props => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        hight: 100,
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const dataStripe = await stripe?.createPaymentMethod({
      type: 'card',
      card: elements?.getElement(CardElement),
    });
    setLoading(true);
    if (!dataStripe?.error) {
      const id = dataStripe?.paymentMethod?.id;
      try {
        const { data } = await axios.post('http://localhost:3001/api/checkout', {
          id,
          amount: 22300, // cents
        });
        data ? console.log(data) : console.log('error');
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
    <Container maxWidth='xs'>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '100%',
            height: 128,
          },
        }}>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid xs={6} marginBottom={1}>
              Subtotal
            </Grid>
            <Grid xs={6} marginBottom={1} textAlign={'right'}>
              {currencyFormatter.format(props.total)}
            </Grid>
            <Grid xs={6} marginBottom={1}>
              Taxes
            </Grid>
            <Grid xs={6} marginBottom={1} textAlign={'right'} borderBottom={'1px solid gray'}>
              {currencyFormatter.format(props.total * 0.19)}
            </Grid>
            <Grid xs={6} marginBottom={1}>
              Total
            </Grid>
            <Grid xs={6} textAlign={'right'} marginBottom={1}>
              {currencyFormatter.format(props.total * 1.19)}
            </Grid>
          </Grid>
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
          <CardElement id='card-element' options={cardStyle} />
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
      </Box>
    </Container>
  );
};

/* MAIN COMPONENT */
export default function StripePay(props) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm total={props.total} />
    </Elements>
  );
}
