import Typography from '@mui/material/Typography';
import AddressCard from './AddresCard';

export default function AddressCards() {
  return (
    <div>
      <Typography variant='h5' gutterBottom>
        My Addresses
      </Typography>
      <AddressCard></AddressCard>
    </div>
  );
}
