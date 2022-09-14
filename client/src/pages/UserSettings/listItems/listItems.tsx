import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NavLink } from 'react-router-dom';
import { PrivatesRoutes } from '@/routes/routes';
import PersonIcon from '@mui/icons-material/Person';

export const mainListItems = (
  <React.Fragment>
    {/* ----- */}
    <NavLink to={PrivatesRoutes.profile}>
      <ListItemButton>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary='Profile' />
      </ListItemButton>
    </NavLink>
    {/* ----- */}
    <NavLink to={PrivatesRoutes.userOrders}>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary='Orders' />
      </ListItemButton>
    </NavLink>
    {/* Address */}
    <NavLink to={PrivatesRoutes.addaddress}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Address' />
      </ListItemButton>
    </NavLink>
    {/*  */}
    <NavLink to={PrivatesRoutes.favorites}>
      <ListItemButton>
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
        <ListItemText primary='Favorites' />
      </ListItemButton>
    </NavLink>
    {/*  */}
    <ListItemButton>
      <ListItemIcon>
        <DeleteForeverIcon />
      </ListItemIcon>
      <ListItemText primary='Delete Account' />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/*     <ListSubheader component='div' inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Current month' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Last quarter' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Year-end sale' />
    </ListItemButton> */}
  </React.Fragment>
);
