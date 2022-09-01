import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Description() {
  return (
    <Box>
      <Typography id='keep-mounted-modal-title' variant='h5' component='h2'>
        Title of product
      </Typography>
      <Typography id='keep-mounted-modal-description' sx={{ mt: 2, fontWeight: 100 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
      <Typography id='keep-mounted-modal-title' variant='h5' component='h2' pt={1}>
        <span>Stock:</span> <span style={{ fontWeight: 100 }}>10</span>
      </Typography>
      <Typography id='keep-mounted-modal-title' variant='h5' component='h2' pt={1} pb={1}>
        $20
      </Typography>
    </Box>
  );
}
