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
import { getStatesAR } from './utils';
import { Outlet } from 'react-router-dom';

function UserSettingsContent() {
  return (
    <>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3} xl={3}>
          <List component='nav'>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Grid>

        <Grid item xs={6} sm={9} xl={9}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}

export default function UserSettings() {
  return (
    <>
      <UserSettingsContent />
    </>
  );
}
