import StoreIconComponent from '../StoreIconComponent/StoreIconComponent';
import SideBarComponent from '../SideBarComponent/SideBarComponent';
import User from '../User/User';
import Search from '../Search/SearchComponent';

import { AppBar, Box, Toolbar } from '@mui/material';
import MenuNav from './menuNav/MenuNav';
import CartIcon from '../../features/cart/CartIcon';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function PrimarySearchAppBar() {
  const location = useLocation();
  const search = useSelector((state: RootState) => state.products.searchResult);

  return (
    <AppBar position='fixed' color='primary'>

      <Toolbar>
      {location.pathname === '/products' && <SideBarComponent/>}

        <StoreIconComponent />

        <Box sx={{ flexGrow: 1 }} />

        {!search?.length && <MenuNav />}

        <Box sx={{ flexGrow: 1 }} />

        {location.pathname === '/products' || location.pathname === '/search-results' && <Search name='product' />}
        <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: 5 }}>
          {!search?.length && <CartIcon />}

          {!search?.length && <User />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
