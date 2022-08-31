import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { Copyright, Facebook, Instagram, WhatsApp } from '@mui/icons-material';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main' }}>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'inherit' }}
        elevation={3}>
        <BottomNavigation showLabels sx={{ bgcolor: 'inherit' }}>
          <BottomNavigationAction label='About Us' />
          <BottomNavigationAction icon={<Facebook />} />
          <BottomNavigationAction icon={<Instagram />} />
          <BottomNavigationAction icon={<WhatsApp />} />
        </BottomNavigation>
        <label>Sehos &reg; {new Date().getFullYear()}</label>
      </Paper>
    </Box>
  );
}

export default Footer;
