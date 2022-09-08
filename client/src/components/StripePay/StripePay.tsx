import { Button, Container, TextField } from '@mui/material';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { usePayMutation } from '../../features/stripe/stripeApiSlice';

const stripePromise = loadStripe(
  'pk_test_51LfWiPB2d7giWWONJCFwX9HwqQchBoOQ5hYeVl88SUOZPxiLRUbs767EYlkywbQsEBPVRGu1URKmMn93JWltTjzQ005JqlzeEy',
);
// 5200828282828210 card / 3 digitos / fecha futura
/* OTHER COMPONENT */
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [pay, { data, isSuccess, isError }] = usePayMutation();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const dataStripe = await stripe?.createPaymentMethod({
      type: 'card',
      card: elements?.getElement(CardElement),
    });
    if (!data?.error) {
      console.log(dataStripe?.paymentMethod);
      /* const id = dataStripe?.paymentMethod?.id; */
      /* const dataPay = await pay({ id, amout: 100000 }).unwrap(); */
    }
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
          }}>
          <Paper elevation={8} variant='outlined' square />
        </Box>

        <CardElement />
        <Button type='submit' color='inherit' variant='outlined' fullWidth>
          Buy
        </Button>
        <span style={{ marginTop: '2rem' }}>card: 4242424242424242</span>
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
