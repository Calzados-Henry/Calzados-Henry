import StoreIconComponent from '../StoreIconComponent/StoreIconComponent';
import SearchComponent from '../Search/SearchComponent';
import SideBarComponent from '../SideBarComponent/SideBarComponent';
import User from '../User/User';

import { AppBar, Box, Toolbar } from '@mui/material';
import MenuNav from './menuNav/MenuNav';
import CartIcon from '../../features/cart/CartIcon';

export default function PrimarySearchAppBar() {
  return (
    <AppBar position='fixed' color='primary' >
      <Toolbar>
        <SideBarComponent />

        <StoreIconComponent />

        <Box sx={{ flexGrow: 0.7 }} />

        {/* <SearchComponent name={'search'} /> */}

        <MenuNav></MenuNav>

        <Box sx={{ flexGrow: 1 }} />

        {/* <User /> */}
        <CartIcon />
      </Toolbar>
    </AppBar>
  );
}
