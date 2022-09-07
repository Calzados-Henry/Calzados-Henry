import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

function Footer() {
  const theme = useTheme();

  return (
    <>
      <div style={{ height: theme.mixins.toolbar.minHeight, marginTop: 30 }}></div>
      <Box sx={{ bgcolor: 'primary.main', textAlign: 'center' }}>
        <Paper
          sx={{ position: 'sticky', bottom: 0, left: 0, right: 0, bgcolor: 'inherit' }}
          elevation={3}>
          <BottomNavigation showLabels sx={{ bgcolor: 'inherit' }}>
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
    </>
  );
}

export default Footer;
