import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PrivatesRoutes } from '../../routes/routes';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import CategoryIcon from '@mui/icons-material/Category';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddchartIcon from '@mui/icons-material/Addchart';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

export default function Navigation() {
  const navigate = useNavigate();

  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  }) as typeof Chip;

  function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  return (
    <div>
      <Paper
        elevation={5}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 30,
          mb: 3,
          borderRadious: '10px',
        }}>
        <div role='presentation' onClick={handleClick}>
          <Breadcrumbs aria-label='breadcrumb' separator='-'>
            <StyledBreadcrumb
              component='a'
              href='#'
              label='Create Product'
              onClick={() => navigate(PrivatesRoutes.addProduct)}
              icon={<AddShoppingCartIcon fontSize='small' />}
            />
            <StyledBreadcrumb
              component='a'
              href='#'
              label='Create Category'
              onClick={() => navigate(PrivatesRoutes.addCategory)}
              icon={<CategoryIcon fontSize='small' />}
            />
            <StyledBreadcrumb
              component='a'
              href='#'
              label='Create Atribute'
              onClick={() => navigate(PrivatesRoutes.addAttribute)}
              icon={<AddchartIcon fontSize='small' />}
            />
            <StyledBreadcrumb
              component='a'
              href='#'
              label='Manage Users'
              onClick={() => navigate(PrivatesRoutes.addAdmin)}
              icon={<SupervisorAccountIcon fontSize='small' />}
            />
          </Breadcrumbs>
        </div>
      </Paper>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
