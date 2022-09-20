import Loader from '@/app/Loader';
import Copyright from '@/components/Copyright/Copyright';
import { useGetOrderQuery } from '@/features/user/orders/ordersApiSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';

export default function OrderDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const { data, isLoading, isSuccess, isError } = useGetOrderQuery(params.id);
  let content;
  let total;
  if (isLoading) content = <Loader size={100} />;
  if (isError) content = <>Error</>;
  if (isSuccess && data) {
    total = data[0].Order.total_ammount;
    content = data?.map(detail => (
      <ListItem key={detail.name} sx={{ py: 1, px: 0 }}>
        <ListItemText primary={detail.name} secondary={'Quantity ' + detail.quantity} />
        <Typography variant='body2'>${detail.price}</Typography>
        <Typography variant='body2'></Typography>
      </ListItem>
    ));
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header title={`Order Detail`} />

      <Box mb={2}>
        <Button
          startIcon={<ArrowBackIcon />}
          color='secondary'
          onClick={() => navigate(-1)}
          size='small'>
          Back to orders
        </Button>
      </Box>

      <Box display='flex'>
        <Typography variant='h5'>Detail&nbsp;&nbsp;</Typography>
        <Typography variant='h5' fontWeight={100}>{`#00${params.id}`}</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText>
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            Description
          </Typography>
        </ListItemText>
        <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
          Price
        </Typography>
      </ListItem>
      <List disablePadding>
        {content}
        <>
          <Divider sx={{ my: 1 }} />
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary='Total' />
            <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
              ${total}
            </Typography>
          </ListItem>
        </>
      </List>
      <Copyright sx={{ mt: 5 }} />
    </>
  );
}

/* 

 <List disablePadding>
        {products?.map(product => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={'Quantity ' + product.quantity} />
            <Typography mr={12} variant='body2'>
              {currencyFormatter.format(product.price ? product.price : 0)}
            </Typography>
            <Typography variant='body2'>
              {currencyFormatter.format(product.price ? product.price * product.quantity : 0)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Shipping' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            {currencyFormatter.format(shipping.delivery.price)}
          </Typography>
        </ListItem>{' '}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Taxes' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            {currencyFormatter.format(total * 0.19)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            {currencyFormatter.format(total + shipping.delivery.price * 1.19)}
          </Typography>
        </ListItem>
      </List>
*/
