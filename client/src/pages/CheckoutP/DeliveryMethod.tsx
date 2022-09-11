import Typography from '@mui/material/Typography';
import { Box, Button, Container, Grid, Paper, Radio, TextField } from '@mui/material';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function DeliveryMethod() {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <Container component='main' maxWidth='xl' sx={{ mb: 4 }}>
      <Box
        component='form'
        noValidate
        onSubmit={e => {
          console.log(e);
        }}>
        <Paper variant='outlined' sx={{ my: { xs: 1, md: 1 }, p: { xs: 2, md: 3 } }}>
          <Grid container spacing={2} alignItems={'center'} justifyContent={'space-bettwen'}>
            <Grid item xs={2}>
              <Radio
                color='secondary'
                {...controlProps('sehos')}
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 28,
                  },
                }}
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
                {...controlProps('delivery')}
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 28,
                  },
                }}
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
              minRows={5}
              maxRows={10}
              id='message'
              placeholder='Please write your message and specifications...'
            />
          </Grid>
        </Paper>
        <Button
          size='large'
          type='submit'
          color='secondary'
          variant='contained'
          disabled={!selectedValue}
          fullWidth
          sx={{ mt: 3, mb: 2 }}>
          Validate Info
        </Button>
      </Box>
    </Container>
  );
}
