import { Divider } from '@mui/material';
import AddressCards from './AddressCards';
import AddressForm from './AddressForm';

export default function Address() {
  return (
    <>
      <AddressForm />
      <Divider sx={{ my: 1 }} />
      <AddressCards />
    </>
  );
}
