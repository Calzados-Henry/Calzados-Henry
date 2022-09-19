import StoreIcon from '@mui/icons-material/Store';
import { Typography } from '@mui/material';

export default function StoreIconComponent() {

  return (
    <>
      <Typography
        variant='h6'
        noWrap
        component='div'
        sx={{
          display: { xs: 'none', sm: 'block' },
          mr: 1,
        }}>
        SEHOS
      </Typography>
      <StoreIcon/>
    </>
  );
}
