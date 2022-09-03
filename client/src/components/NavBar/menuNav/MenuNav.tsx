import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export default function MenuNav() {
  return (
    <Stack spacing={2} direction='row'>
      <Link to='/home'>
        <Button variant='text' color='inherit' startIcon={<HomeOutlinedIcon />}>
          Home
        </Button>
      </Link>
      <Link to='/about'>
        <Button variant='text' color='inherit'>
          About
        </Button>
      </Link>
      <Link to='/products'>
        <Button variant='text' color='inherit'>
          Products
        </Button>
      </Link>
      <Link to='/contact'>
        <Button variant='text' color='inherit'>
          Contact
        </Button>
      </Link>
    </Stack>
  );
}
