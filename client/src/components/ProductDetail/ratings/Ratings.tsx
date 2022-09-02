import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ProductPartial } from '../../../features/product/product.model';

export default function Ratings({ rating }: ProductPartial) {
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
        {rating ? Math.ceil(rating?.rate) : 0}
      </Typography>
      <Typography id='keep-mounted-modal-description' sx={{ mt: 2, mb: 2 }}>
        Ratings Average
      </Typography>
      <Rating name='read-only' value={rating ? Math.ceil(rating?.rate) : 0} readOnly />
    </Box>
  );
}
