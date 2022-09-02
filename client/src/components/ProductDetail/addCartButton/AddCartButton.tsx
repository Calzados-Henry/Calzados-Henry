import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function AddCartButton() {
  return (
    <Box
      mt={2}
      sx={{
        width: 500,
        maxWidth: '100%',
      }}>
      <Button
        variant='contained'
        fullWidth
        sx={{ width: '100%' }}
        startIcon={<AddShoppingCartIcon />}>
        ADD TO CART
      </Button>
    </Box>
  );
}
