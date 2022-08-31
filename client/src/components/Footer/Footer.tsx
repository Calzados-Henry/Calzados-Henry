import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate()
  return (
    <Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels>
          <BottomNavigationAction label='About Us' onClick={() => navigate('/about')} />
          <BottomNavigationAction
            icon={<Facebook />}
            onClick={() => {
              window.open('https://www.facebook.com/profile.php?id=100084956481996');
              return null;
            }}
          />
          <BottomNavigationAction
            icon={<Instagram />}
            onClick={() => {
              window.open('https://www.instagram.com/sehos22/');
              return null;
            }}
          />
          <BottomNavigationAction
            icon={<WhatsApp />}
            onClick={() => {
              window.open('https://chat.whatsapp.com/HoXT6nlQFrY58e53eRlKbf');
              return null;
            }}
          />
        </BottomNavigation>
        <label>Sehos &reg; {new Date().getFullYear()}</label>
      </Paper>
    </Box>
  );
}

export default Footer;
