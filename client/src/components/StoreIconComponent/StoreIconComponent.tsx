import { useNavigate } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';

import { Typography, Button } from '@mui/material';
import { PublicRoutes } from '../../routes/routes';

export default function StoreIconComponent() {
  const navigate = useNavigate();

  return (
    <>
      <Typography
        variant='h6'
        noWrap
        component='div'
        onClick={() => navigate(PublicRoutes.start)}
        sx={{
          display: { xs: 'none', sm: 'block' },
          mr: 1,
          '&:hover': {
            cursor: 'pointer',
          },
        }}>
        SEHOS
      </Typography>

      <Button variant='text' color='inherit'>
        <StoreIcon onClick={() => navigate(PublicRoutes.home)} />
      </Button>
    </>
  );
}
