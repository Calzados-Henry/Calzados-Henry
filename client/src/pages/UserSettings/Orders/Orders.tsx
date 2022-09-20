/* eslint-disable camelcase */
import Loader from '@/app/Loader';
import { useGetOrdersUserQuery } from '@/features/user/orders/ordersApiSlice';
import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Header from '../Header';
import { useEffect } from 'react';

export interface CreateDataI {
  id: number | string;
  total_amount: number;
  purchase_date: string;
  order_state: string;
}

function createData(
  id: number | string,
  total_amount: number,
  purchase_date: string,
  order_state: string,
) {
  return { id, total_amount, purchase_date, order_state };
}

export default function Orders() {
  const { data, isLoading, isSuccess } = useGetOrdersUserQuery();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let content, tableContent;
  if (isLoading) content = <Loader size={60} />;
  if (isSuccess && data && data.length > 0) {
    data?.forEach(order => {
      return createData(order?.id, order?.total_ammount, order?.purchase_date, order?.order_state);
    });
    tableContent = data.map(row => {
      return (
        <TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell align='center'>{row?.id}</TableCell>
          <TableCell align='right'>{`$${row?.total_ammount}`}</TableCell>
          <TableCell align='right'>{row?.purchase_date}</TableCell>
          <TableCell align='right'>{row?.order_state}</TableCell>
          <TableCell align='right'>
            <Link to={`${row?.id}`}>
              <ReadMoreIcon />
            </Link>
          </TableCell>
        </TableRow>
      );
    });
  }

  if (isSuccess && data.length < 1)
    content = (
      <Typography mt={2} variant='h6' fontWeight={100}>
        There are no orders related to you
      </Typography>
    );
  return (
    <>
      <Header title='Orders' />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell align='right'>Date</TableCell>
              <TableCell align='right'>Order State</TableCell>
              <TableCell align='right'>Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </TableContainer>
      <Box>{content}</Box>
    </>
  );
}
