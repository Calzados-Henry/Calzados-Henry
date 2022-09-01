import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

export default function SideBarComponent() {
  return (
    <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
      <MenuIcon />
    </IconButton>
  );
}
