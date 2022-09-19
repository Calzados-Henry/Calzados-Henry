/* eslint-disable camelcase */
import { useUpdateUserMutation } from '@/features/user/userApiSlice';
import { updateUserInfo } from '@/features/user/userSlice';
import { useAppDispatch } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Box, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const validations = yup.object({
  username: yup
    .string()
    .min(3, 'Min 3 characters')
    .max(50, 'Max 50 characters')
    .nullable()
    .required('Username is required'),
});

export default function AccountInfo({ handleClose }) {
  const [updateUser, result] = useUpdateUserMutation();
  const [edit, setEdit] = useState(true);
  const auth = useAuth();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      id: auth.id,
      username: null,
      phone: null,
    },
    validationSchema: validations,
    onSubmit: (values, { resetForm }) => {
      updateUser(values)
        .then(() => handleClose())
        .then(() =>
          Swal.fire({
            title: 'Update Data',
            icon: 'success',
            confirmButtonColor: '#5d3a00',
          }),
        )
        .then(() => {
          dispatch(updateUserInfo(values));
          setEdit(() => !edit);
        })
        .catch(() =>
          Swal.fire({
            title: 'Upps!',
            text: 'something went wrong!',
            icon: 'error',
            confirmButtonColor: '#5d3a00',
          }),
        )
        .finally(() => {
          handleClose();
          resetForm();
        });
    },
  });
  const { isValid } = formik;
  return (
    <Box
      width={'100%'}
      component='form'
      autoComplete='on'
      noValidate
      onSubmit={formik.handleSubmit}>
      <Box>
        <Typography variant='h6' gutterBottom display={'flex'} alignItems={'center'} mb={2}>
          <ManageAccountsIcon /> &nbsp;&nbsp;Account information
          <Button onClick={() => setEdit(() => !edit)} color='secondary' startIcon={<EditIcon />}>
            {edit ? <u>edit</u> : <u>close</u>}
          </Button>
        </Typography>
      </Box>
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
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
              {result.isLoading ? <CircularProgress size={20} color='primary' /> : 'update'}
            </Button>
          </Grid>
        </Grid>
      </>
    </Box>
  );
}
