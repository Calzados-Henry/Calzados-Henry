import Loader from '@/app/Loader';
import { useGetAddressQuery } from '@/features/user/address/addressApiSlice';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import AddressCard from './AddresCard';
import { Box } from '@mui/material';

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
      <Box display='flex' alignItems={'center'}>
        <HomeIcon />
        <Typography variant='h6' gutterBottom>
          &nbsp;&nbsp;My Addresses
        </Typography>
      </Box>
      {content}
    </>
  );
}
