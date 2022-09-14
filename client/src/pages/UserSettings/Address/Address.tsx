import { Divider } from '@mui/material';
import Header from '../Header';
import AddressCards from './AddressCards';
import AddressForm from './AddressForm';

export default function Address() {
  return (
    <>
      <Header title='Address' />
      <AddressForm />
      <Divider sx={{ my: 1 }} />
      <AddressCards />
    </>
  );
}
