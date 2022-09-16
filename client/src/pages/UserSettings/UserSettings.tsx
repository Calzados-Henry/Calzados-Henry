import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { mainListItems, secondaryListItems } from './listItems/listItems';
import { Outlet } from 'react-router-dom';
import { createUserInfo } from '@/features/user/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '@/features/user/userApiSlice';
import { useAuth } from '@/hooks/useAuth';
import { RootState } from '@/store';

function UserSettingsContent() {
  const dispatch = useDispatch();
  const { id: userId } = useAuth();
  const { data, isSuccess, isError } = useGetUserByIdQuery(userId);

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
