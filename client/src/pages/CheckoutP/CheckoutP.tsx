import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import Review from './Review';
import Copyright from '@/components/Copyright/Copyright';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import DeliveryMethod from './DeliveryMethod';
import OrderStatus from './OrderStatus';
import { useNavigate } from 'react-router-dom';

const steps = ['Shipping address', 'Delivery method', 'Pay Order  Summary', 'Finish'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <DeliveryMethod />;
    case 2:
      return <Review />;
    case 3:
      return <OrderStatus />;
    default:
      throw new Error('Unknown step');
  }
}

export default function CheckoutP() {
  const [activeStep, setActiveStep] = React.useState(0);
  const check = useSelector((state: RootState) => state.checkout.check);
  const navigate = useNavigate();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />
      <Container component='main' maxWidth='xl' sx={{ mb: 4 }}>
        <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component='h1' variant='h4' align='center'>
            Sehos Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant='h5' gutterBottom>
                  Thank you for your buy.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button
                      color='secondary'
                      variant='outlined'
                      onClick={handleBack}
                      size='medium'
                      sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <Button
                      disabled={!check}
                      size='medium'
                      variant='contained'
                      color='secondary'
                      onClick={() => navigate('/')}
                      sx={{ mt: 3, ml: 1 }}>
                      Finish
                    </Button>
                  ) : (
                    <Button
                      disabled={!check}
                      size='medium'
                      variant='contained'
                      color='secondary'
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}>
                      {'Next'}
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </>
  );
}
