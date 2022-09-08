import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../routes/routes';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'image', headerName: 'Image', width: 100 },
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 170,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: 'font-tabular-nums',
  },
  { field: 'cant', headerName: 'Cant', type: 'number', width: 90 },
  {
    field: 'total',
    headerName: 'Total',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => params.row.price * params.row.cant,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: 'font-tabular-nums',
  },
];

export default function CartStore() {
  const products = useSelector((state: RootState) => state.cart.products);
  const navigate = useNavigate();

  const cartProducts = products.map(product => {
    return { ...product, cant: 1 };
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={cartProducts}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
        <Button
          onClick={() => navigate(PublicRoutes.login)}
          variant='contained'
          sx={{ mt: 1, mb: 2, width: '20%' }}>
          Buy Now!
        </Button>
      </Box>
    </div>
  );
}
