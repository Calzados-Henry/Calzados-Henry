import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { PublicRoutes } from '../../routes/routes';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid #fe4450`,
    padding: '0 4px',
  },
}));

export default function CartIcon() {
  const navigate = useNavigate();
  const auth = useAuth()
  const [renderCount, setRenderCount] = useState(0)

  const cart = useSelector((state: RootState) => auth.user ? state.apiCart : state.cart);

  useEffect(() => {
    setRenderCount(renderCount + 1)
  }, [cart.reRender])

  return (
    <IconButton onClick={() => navigate(PublicRoutes.cart)} aria-label='cart'>
      <StyledBadge
        badgeContent={cart.products.length < 10 ? cart.products.length : '9+'}
        color='secondary'>
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
