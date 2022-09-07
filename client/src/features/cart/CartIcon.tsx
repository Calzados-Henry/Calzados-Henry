import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';

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

  const cart = useSelector((state: RootState) => state.cart);
  return (
    <IconButton onClick={() => navigate('/test')} aria-label='cart'>
      <StyledBadge
        badgeContent={cart.products.length < 10 ? cart.products.length : '9+'}
        color='secondary'>
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
