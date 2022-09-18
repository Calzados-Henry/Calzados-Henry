import { useGetUserByIdQuery } from '@/features/user/userApiSlice';
import { useAuth } from '@/hooks/useAuth';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { mainListItems, secondaryListItems } from './listItems/listItems';

function UserSettingsContent() {
  const dispatch = useDispatch();
  const { id: userId } = useAuth();
  const { data, isSuccess, isError } = useGetUserByIdQuery(userId);

  return (
    <>
      <CssBaseline />
      <Grid container sm spacing={2}>
        <Grid item xs={6} sm={3} xl={3}>
          <List component='nav'>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Grid>

        <Grid item xs={6} sm={7} xl={7}>
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
