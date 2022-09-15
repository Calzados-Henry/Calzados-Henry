/* eslint-disable camelcase */
import { useCreateAddressMutation } from '@/features/user/address/addressApiSlice';
import { useAuth } from '@/hooks/useAuth';
import { UserDataInfoForm } from '@/sehostypes/User';
import { RootState } from '@/store';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

const validations = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email().required('Username is required'),
});

export default function AccountInfo() {
  const [createAddress] = useCreateAddressMutation();
  const [edit, setEdit] = useState(true);
  const auth = useAuth();

  const {
    id: userId,
    username,
    phone,
  }: UserDataInfoForm = useSelector((state: RootState) => state.user);

  const formik = useFormik({
    initialValues: {
      userId,
      username,
      email: auth.user,
      phone,
    },
    validationSchema: validations,
    onSubmit: values => {
      setEdit(() => !edit);
    },
  });
  const { isValid } = formik;
  return (
    <Fragment>
      <Box component='form' noValidate onSubmit={formik.handleSubmit}>
        <Box>
          <Typography variant='h6' gutterBottom display={'flex'} alignItems={'center'} mb={2}>
            <ManageAccountsIcon /> &nbsp;&nbsp;Account information
            <Button onClick={() => setEdit(() => !edit)} color='secondary' startIcon={<EditIcon />}>
              {edit ? <u>edit</u> : <u>close</u>}
            </Button>
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='username'
              name='username'
              label='User Name'
              fullWidth
              disabled={edit}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='phone'
              name='phone'
              label='Phone'
              fullWidth
              disabled={edit}
              autoComplete='shipping address-level2'
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} textAlign={'right'}>
            <Button
              size='small'
              type='submit'
              color='secondary'
              variant='contained'
              disabled={!isValid || edit}
              sx={{ mt: 3, mb: 2 }}>
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
