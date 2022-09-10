import StoreIconComponent from '../StoreIconComponent/StoreIconComponent';
import SearchComponent from '../Search/SearchComponent';
import SideBarComponent from '../SideBarComponent/SideBarComponent';
import User from '../User/User';
import Search from '../Search/SearchComponent';

import { AppBar, Box, Toolbar } from '@mui/material';
import MenuNav from './menuNav/MenuNav';
import CartIcon from '../../features/cart/CartIcon';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PrimarySearchAppBar() {
  const location = useLocation();

  return (
    <AppBar position='fixed' color='primary'>
      <Toolbar>
        <SideBarComponent />

        <StoreIconComponent />

        <Box sx={{ flexGrow: 0.7 }} />

        {/* <SearchComponent name={'search'} /> */}

        <MenuNav />

        <Box sx={{ flexGrow: 1 }} />

        {location.pathname === '/products' && <Search name='product' />}

        <User/>
        <CartIcon />
      </Toolbar>
    </AppBar>
  );
}
