import { Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { PublicRoutes } from '../../../routes/routes';

export default function MenuNav() {
  const navigate = useNavigate();

  return (
    <Stack spacing={2} direction='row'>
      <Button
        onClick={() => navigate(PublicRoutes.home)}
        variant='text'
        color='inherit'
        startIcon={<HomeOutlinedIcon />}>
        Home
      </Button>
      <Button onClick={() => navigate(PublicRoutes.about)} variant='text' color='inherit'>
        About
      </Button>
      <Button onClick={() => navigate(PublicRoutes.products)} variant='text' color='inherit'>
        Products
      </Button>
      <Button onClick={() => navigate(PublicRoutes.contact)} variant='text' color='inherit'>
        Contact
      </Button>
    </Stack>
  );
}
