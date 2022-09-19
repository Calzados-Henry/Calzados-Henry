import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Avatar, Tooltip } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { useGetUserByIdQuery } from '@/features/user/userApiSlice';
import Loader from '@/app/Loader';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import BadgeIcon from '@mui/icons-material/Badge';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ProfileModal from './ProfileModal';

export default function DataCard() {
  const auth = useAuth();
  const { data: user, isLoading, isSuccess, isError } = useGetUserByIdQuery(auth.id);

  let content;
  if (isLoading) content = <Loader size={100} />;
  if (isError) content = <>Error</>;
  if (user)
    content = (
      <>
        <Grid item mr={2}>
          <Tooltip title='avatar' placement='top'>
            <Avatar sx={{ width: 80, height: 80 }}></Avatar>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs={6}>
              <Tooltip title='full name' placement='top'>
                <Typography
                  display={'flex'}
                  alignItems={'center'}
                  variant='h6'
                  component='div'
                  fontWeight={100}>
                  <AccountBoxIcon color='secondary' /> {user.name} {user.last_name}
                </Typography>
              </Tooltip>
              <Tooltip title='username' placement='top'>
                <Typography
                  pt={1}
                  fontWeight={300}
                  variant='body2'
                  color='text.secondary'
                  display={'flex'}
                  alignItems={'center'}>
                  <AlternateEmailIcon color='secondary' />
                  {user.username}
                </Typography>
              </Tooltip>
            </Grid>

            <Grid item xs={6}>
              <Tooltip title='Identification number' placement='top'>
                <Typography variant='body2' gutterBottom display={'flex'} alignItems={'center'}>
                  <BadgeIcon /> {user.identification}
                </Typography>
              </Tooltip>
              <Tooltip title='cell number' placement='top'>
                <Typography pt={1} variant='body2' display={'flex'} alignItems={'center'}>
                  <PhoneIphoneIcon color='secondary' /> {user.phone}
                </Typography>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item>
            <Tooltip title='edit your profile' placement='top'>
              <ProfileModal />
            </Tooltip>
          </Grid>
        </Grid>
      </>
    );
  return (
    <Paper
      elevation={1}
      sx={{
        height: 120,
        p: 2,
        margin: 'auto',
        minWidth: 500,
        flexGrow: 1,
        display: 'flex',
        alignContent: 'center',
      }}>
      <Grid container spacing={2}>
        {content}
      </Grid>
    </Paper>
  );
}
