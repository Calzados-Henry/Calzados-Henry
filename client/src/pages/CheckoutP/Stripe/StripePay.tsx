import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CreditCardDetail from './CreditCardDetail';
import { stripePublicKey } from '../../../utils/utils';
import { Button, Grid } from '@mui/material';

const stripePromise = loadStripe(stripePublicKey);

export default function CommonTextFields() {
  return (
    <Elements stripe={stripePromise}>
      <CreditCardDetail />
    </Elements>
  );
}
