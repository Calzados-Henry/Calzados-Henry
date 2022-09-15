import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ProductPartial } from '../../../sehostypes/Product';
export default function Description({ name, description, sell_price }: ProductPartial) {
  return (
    <Box>
      <Typography id='keep-mounted-modal-title' variant='h5' component='h2'>
        {name ?? <p>{name}</p>}
      </Typography>
      <Typography id='keep-mounted-modal-description' sx={{ mt: 2, fontWeight: 100 }}>
        {description}
      </Typography>
      
      <Typography id='keep-mounted-modal-title' variant='h5' component='h2' pt={1} pb={1}>
        ${sell_price}
      </Typography>
    </Box>
  );
}
