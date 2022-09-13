import { Box, CircularProgress } from '@mui/material';

export default function Loader() {
  return (
    <Box
      sx={{ display: 'flex' }}
      justifyContent='center'
      alignItems={'center'}
      width='100vw'
      height='100vh'>
      <CircularProgress size={120} color='secondary' />
    </Box>
  );
}
