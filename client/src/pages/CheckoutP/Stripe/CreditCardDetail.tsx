import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  StripeTextFieldNumber,
  StripeTextFieldExpiry,
  StripeTextFieldCVC,
} from './CommonTextFields';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { stripePublicKey } from '../../../utils/utils';
import { useElements, useStripe } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(stripePublicKey);

export default function CreditCardDetail() {
  const stripe = useStripe();
  const elements = useElements();

  /* ------------------------------------------------------------------- */
  /* ------------------------------------------------------------------- */
  /* ------------------------------------------------------------------- */
  const [state, setState] = React.useState({
    cardNumberComplete: false,
    expiredComplete: false,
    cvcComplete: false,
    cardNumberError: null,
    expiredError: null,
    cvcError: null,
  });
  const onElementChange =
    (field, errorField) =>
    ({ complete, error = { message: null } }) => {
      setState({ ...state, [field]: complete, [errorField]: error.message });
    };
  const { cardNumberError, expiredError, cvcError } = state;
  /* ------------------------------------------------------------------- */
  /* ------------------------------------------------------------------- */
  /* ------------------------------------------------------------------- */

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField required id='cardName' label='Name on card' fullWidth autoComplete='cc-name' />
      </Grid>

      <Grid item xs={12} md={6}>
        <StripeTextFieldNumber
          error={Boolean(cardNumberError)}
          labelErrorMessage={cardNumberError}
          onChange={onElementChange('cardNumberComplete', 'cardNumberError')}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StripeTextFieldExpiry
          error={Boolean(expiredError)}
          labelErrorMessage={expiredError}
          onChange={onElementChange('expiredComplete', 'expiredError')}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StripeTextFieldCVC
          error={Boolean(cvcError)}
          labelErrorMessage={cvcError}
          onChange={onElementChange('cvcComplete', 'cvcError')}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Button size='large' type='submit' color='secondary' variant='contained' fullWidth>
          {'Fast Pay'}
        </Button>
      </Grid>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </Grid>
  );
}
