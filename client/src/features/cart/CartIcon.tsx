import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { PublicRoutes } from '../../routes/routes';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { getApiUserCart } from './cartApiSlice';

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid #fe4450`,
    padding: '0 4px',
  },
}));

export default function CartIcon() {
  const dispatch = useDispatch()
  const userInfo = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo') as string) : null
  const navigate = useNavigate();
  const auth = useAuth()
  const cart = useSelector((state: RootState) => auth.user ? state.apiCart : state.cart);
  let renderCount = 0

  useEffect(() => {
    auth.user && dispatch(getApiUserCart(userInfo.id))
  }, [])

  useEffect(() => {
    renderCount = renderCount + 1
  }, [cart.complete])

  return (
    <IconButton onClick={() => navigate(PublicRoutes.cart)} aria-label='cart'>
      <StyledBadge
        badgeContent={cart.products && (cart.products.length < 10 ? cart.products.length : '9+')}
        color='secondary'>
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
