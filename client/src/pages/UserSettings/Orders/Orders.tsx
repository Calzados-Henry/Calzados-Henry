/* eslint-disable camelcase */
import Loader from '@/app/Loader';
import { useGetOrdersUserQuery } from '@/features/user/orders/ordersApiSlice';
import { useAuth } from '@/hooks/useAuth';
import { currencyFormatter } from '@/utils/currencyFormat';
import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Header from '../Header';

function createData(id: number, total_ammount: number, purchase_date: string, order_state: string) {
  return { id, total_ammount, purchase_date, order_state };
}

const rows = [createData(1, 620, '12-01-2022', 'fullfiled')];

export default function Orders() {
  const auth = useAuth();
  const { data, isLoading, isSuccess } = useGetOrdersUserQuery(auth.id);

  let content, tableContent;
  if (isLoading) content = <Loader size={60} />;
  if (isSuccess && data)
    tableContent = rows.map(row => (
      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align='center'>{row.id}</TableCell>
        <TableCell align='right'>{currencyFormatter.format(row.total_ammount)}</TableCell>
        <TableCell align='right'>{row.purchase_date}</TableCell>
        <TableCell align='right'>{row.order_state}</TableCell>
      </TableRow>
    ));
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
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </TableContainer>
      <Box>{content}</Box>
    </>
  );
}
