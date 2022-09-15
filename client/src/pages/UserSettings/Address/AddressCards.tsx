import Loader from '@/app/Loader';
import { useGetAddressQuery } from '@/features/user/address/addressApiSlice';
import Typography from '@mui/material/Typography';
import AddressCard from './AddresCard';

export default function AddressCards() {
  const { data, isLoading, isSuccess, isError, error } = useGetAddressQuery();

  let content;
  if (isLoading) content = <Loader size={60} />;
  if (isError || error) content = <>Error</>;
  if (isSuccess && data)
    if (data.length < 1)
      content = (
        <Typography variant='h6'>
          There are no addresses associated with this account, please add an address.
        </Typography>
      );
    else
      content = data.map((address, index) => {
        return (
          <AddressCard
            key={index}
            id={address.id}
            title={address.title}
            country={address.country}
            state={address.state}
            city={address.city}
            address={address.address}
          />
        );
      });

  return (
    <>
      <Typography variant='h5' gutterBottom>
        My Addresses
      </Typography>
      {content}
    </>
  );
}
