import { Button, Container, TextField, Typography, Grid } from '@mui/material';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { usePayMutation } from '../../features/stripe/stripeApiSlice';
import { currencyFormatter } from '../../utils/currencyFormat';
const stripePromise = loadStripe(
  'pk_test_51LfWiPB2d7giWWONJCFwX9HwqQchBoOQ5hYeVl88SUOZPxiLRUbs767EYlkywbQsEBPVRGu1URKmMn93JWltTjzQ005JqlzeEy',
);
// 5200828282828210 card / 3 digitos / fecha futura
/* OTHER COMPONENT */
const CheckoutForm = props => {
  const appearance = {
    theme: 'stripe',
  };

  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const [pay, { data, isSuccess, isError, error }] = usePayMutation();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const dataStripe = await stripe?.createPaymentMethod({
      type: 'card',
      card: elements?.getElement(CardElement),
    });
    if (!dataStripe?.error) {
      const id = dataStripe?.paymentMethod?.id;
      dispatch(await pay({ id, amount: 10000 }).unwrap());
    }
    data ? console.log(data) : console.log(error);
  };

  return (
    <Container maxWidth='xs'>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 128,
              height: 128,
            },
          }}></Box>
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

        <CardElement />
        <Button type='submit' color='inherit' variant='outlined' disabled={!stripe} fullWidth>
          Buy
        </Button>
        <span style={{ marginTop: '2rem' }}>card: 4242424242424242</span>
      </form>
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
