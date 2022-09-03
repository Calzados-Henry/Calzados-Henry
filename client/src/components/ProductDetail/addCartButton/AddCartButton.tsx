import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';

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
        size='large'
        fullWidth
        sx={{ width: '100%', marginBottom: 2 }}
        startIcon={<AddShoppingCartIcon />}>
        ADD TO CART
      </Button>
      <Button
        variant='outlined'
        size='large'
        fullWidth
        sx={{ width: '100%', marginBottom: 2 }}
        startIcon={<ShoppingCartCheckoutOutlinedIcon />}>
        GO TO CART
      </Button>
    </Box>
  );
}
