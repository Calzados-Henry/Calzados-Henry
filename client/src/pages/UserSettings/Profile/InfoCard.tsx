import { useGetUserByIdQuery } from '@/features/user/userApiSlice';
import { useAuth } from '@/hooks/useAuth';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { TypeFormatFlags } from 'typescript';

export default function InfoCard() {
  const auth = useAuth();
  const { data: user, isLoading, isSuccess, isError } = useGetUserByIdQuery(auth.id);

  let content;
  if (isLoading) content = <CircularProgress size={60} />;
  if (isSuccess && user)
    content = (
      <Grid container xs={12} spacing={1}>
        <Grid item xs={3}>
          <Typography variant='h5'>First Name:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h5' fontWeight={100}>
            {user.name}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h5'>Name:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h5' fontWeight={100}>
            {user.last_name}
          </Typography>
        </Grid>
        {/*  */}
        <Grid item xs={3}>
          <Typography variant='h5'>Identification:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h5' fontWeight={100}>
            {user.identification}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h5'>Birthday</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h5' fontWeight={100}>
            {String(user.birth_date)}
          </Typography>
        </Grid>
      </Grid>
    );
  return <Box>{content}</Box>;
}
