import React from 'react';
import { useNavigate } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';

import {
  Typography,
} from '@mui/material';

export default function StoreIconComponent() {
  const navigate = useNavigate();

  return (
  <>
    <Typography
        variant='h6'
        noWrap
        component='div'
        onClick={()=> navigate('/')}
        sx={{ display: { xs: 'none', sm: 'block' }, mr: 1, '&:hover': {
        cursor: 'pointer',
        } }}>
        SEHOS
    </Typography>
    
    <StoreIcon />
      
 </>
  );
}
