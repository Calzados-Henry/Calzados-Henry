import StoreIconComponent from '../StoreIconComponent/StoreIconComponent';
import SideBarComponent from '../SideBarComponent/SideBarComponent';
import User from '../User/User';
import Search from '../Search/SearchComponent';

import { AppBar, Box, Toolbar } from '@mui/material';
import MenuNav from './menuNav/MenuNav';
import CartIcon from '../../features/cart/CartIcon';
import { useLocation } from 'react-router-dom';

export default function PrimarySearchAppBar() {
  const location = useLocation();

  return (
    <AppBar position='fixed' color='primary'>
      <Toolbar>
        <SideBarComponent />

        <StoreIconComponent />

        <Box sx={{ flexGrow: 1 }} />

        {/* <SearchComponent name={'search'} /> */}

        <MenuNav />

        <Box sx={{ flexGrow: 1 }} />

        {location.pathname === '/products' && <Search name='product' />}
        <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: 5 }}>
          <CartIcon />

          <User />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
