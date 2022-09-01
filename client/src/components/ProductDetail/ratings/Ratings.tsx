import React from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Ratings() {
  return (
    <Box
      mt={3}
      mb={3}
      sx={{
        display: 'grid',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        alignContent: 'center',
      }}>
      <Typography id='keep-mounted-modal-title' variant='h5' component='h2'>
        {4.2}
      </Typography>
      <Typography id='keep-mounted-modal-description' sx={{ mt: 2, mb: 2 }}>
        Ratings Average
      </Typography>
      <Rating name='read-only' value={4} readOnly />
    </Box>
  );
}
