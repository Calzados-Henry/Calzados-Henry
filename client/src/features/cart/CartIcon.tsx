import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid #fe4450`,
    padding: '0 4px',
  },
}));

export default function CartIcon() {
  const cart = useSelector(state => state.cart);
  return (
    <IconButton aria-label='cart'>
      <StyledBadge badgeContent={cart.products.length} color='secondary'>
        <Link to='/test'>
          <ShoppingCartIcon />
        </Link>
      </StyledBadge>
    </IconButton>
  );
}
