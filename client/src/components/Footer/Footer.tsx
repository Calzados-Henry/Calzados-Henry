import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { Copyright, Facebook, Instagram, WhatsApp } from '@mui/icons-material';

function Footer() {
  return (
    <Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels>
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
