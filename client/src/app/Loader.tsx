import { Box, CircularProgress } from '@mui/material';

interface LoaderProps {
  size: number;
}

export default function Loader(props: LoaderProps) {
  return (
    <Box
      sx={{ display: 'flex' }}
      justifyContent='center'
      alignItems={'center'}
      width='100vw'
      height='100vh'>
      <CircularProgress size={props.size} color='secondary' />
    </Box>
  );
}
