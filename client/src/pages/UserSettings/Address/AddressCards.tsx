import { useGetAddressQuery } from '@/features/user/address/addressApiSlice';
import HomeIcon from '@mui/icons-material/Home';
import { Box, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddressCard from './AddressCard';

export default function AddressCards() {
  const { data, isLoading, isSuccess, isError, error } = useGetAddressQuery();

  let content;
  if (isLoading) content = <CircularProgress size={100} color='secondary' />;
  if (isError || error) content = <>Error</>;
  if (isSuccess && data)
    content = data?.map((address, index) => {
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
  if (data && data.length < 1)
    content = (
      <Typography mt={2} variant='h6' fontWeight={100}>
        There are no addresses associated with this account, please add an address.
      </Typography>
    );
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
