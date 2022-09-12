import Typography from '@mui/material/Typography';
import { Box, Button, Container, Grid, Paper, Radio, TextField } from '@mui/material';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDelivery, resetCheck } from '@/features/checkout/checkoutSlice';
import { RootState } from '@/store';

export default function DeliveryMethod() {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.checkout.delivery);
  const [options, setOptions] = useState(selector);
  useEffect(() => {
    dispatch(resetCheck());
    setOptions(selector);
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    event.target.value === 'delivery'
      ? setOptions({ ...options, type: event.target.value, price: 10 })
      : setOptions({ ...options, type: event.target.value, price: 0 });
  };

  return (
    <Container component='main' maxWidth='xl' sx={{ mb: 4 }}>
      <Box component='form' noValidate>
        <Paper variant='outlined' sx={{ my: { xs: 1, md: 1 }, p: { xs: 2, md: 3 } }}>
          <Grid container spacing={2} alignItems={'center'} justifyContent={'space-bettwen'}>
            <Grid item xs={2}>
              <Radio
                color='secondary'
                checked={selectedValue === 'sehos'}
                onChange={handleChange}
                value='sehos'
                name='radio-buttons'
                inputProps={{ 'aria-label': 'sehos' }}
              />
            </Grid>
            <Grid item xs={1}>
              <RoomServiceIcon fontSize='large' />
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h5'>In sehos</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='h5' fontWeight={100}>
                Pick up in-store
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='h5' fontWeight={100}>
                Free!
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper variant='outlined' sx={{ my: { xs: 1, md: 1 }, p: { xs: 2, md: 3 } }}>
          <Grid container spacing={2} alignItems={'center'} justifyContent={'space-bettwen'}>
            <Grid item xs={2}>
              <Radio
                color='secondary'
                checked={selectedValue === 'delivery'}
                onChange={handleChange}
                value='delivery'
                name='radio-buttons'
                inputProps={{ 'aria-label': 'delivery' }}
              />
            </Grid>
            <Grid item xs={1}>
              <LocalShippingIcon fontSize='large' />
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h5'>Send to Address</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='h5' fontWeight={100}>
                Delivery
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='h5' fontWeight={100}>
                $10
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper variant='outlined' sx={{ my: { xs: 1, md: 1 }, p: { xs: 2, md: 3 } }}>
          <Typography>
            If you would like to add a comment about your order, please write it in the field below.
          </Typography>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name='message'
              label='Message'
              type='text'
              multiline
              onChange={e => setOptions({ ...options, message: e.currentTarget.value })}
              value={options.message}
              minRows={5}
              maxRows={10}
              id='message'
              placeholder='Please write your message and specifications...'
            />
          </Grid>
        </Paper>
        <Button
          size='large'
          onClick={() => dispatch(setDelivery(options))}
          color='secondary'
          variant='contained'
          disabled={!selectedValue}
          fullWidth
          sx={{ mt: 3, mb: 2 }}>
          Update Info
        </Button>
      </Box>
    </Container>
  );
}
