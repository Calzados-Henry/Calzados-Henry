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
import { useDispatch } from 'react-redux';
import { getApiUserCart } from '../../features/cart/cartApiSlice';

export default function PrimarySearchAppBar() {
  const location = useLocation();
  const dispatch = useDispatch()

  useEffect(() => {
    window.localStorage.getItem('userInfo') &&
    dispatch(getApiUserCart(JSON.parse(window.localStorage.getItem('userInfo') as string).id))
  }, [])

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
