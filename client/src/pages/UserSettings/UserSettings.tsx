import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { mainListItems, secondaryListItems } from './listItems/listItems';
import Copyright from '@/components/Copyright/Copyright';
import { Outlet } from 'react-router-dom';

function UserSettingsContent() {
  return (
    <Box sx={{ display: 'flex', position: 'absolute', left: 0, minWidth: '300px', width: '15vw' }}>
      <CssBaseline />
      <Grid container>
        <List component='nav'>
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Grid>
      <Grid container xl={12}>
        <Outlet />
      </Grid>
    </Box>
  );
}

export default function UserSettings() {
  return (
    <>
      <UserSettingsContent />
    </>
  );
}
