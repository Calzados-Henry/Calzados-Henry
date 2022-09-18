/* eslint-disable camelcase */
import { useUpdateUserMutation } from '@/features/user/userApiSlice';
import { updateUserInfo } from '@/features/user/userSlice';
import { useAuth } from '@/hooks/useAuth';
import BadgeIcon from '@mui/icons-material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const validations = yup.object({
  name: yup
    .string()
    .nullable()
    .min(3, 'Min 3 characters')
    .max(50, 'Max 50 characters')
    .required('Required'),
  last_name: yup
    .string()
    .nullable()
    .min(3, 'Min 3 characters')
    .max(50, 'Max 50 characters')
    .required('Required'),
  identification: yup
    .number()
    .nullable()
    .max(9999999999, '10 characters maximun')
    .required('Required'),
  birth_date: yup.string().nullable().required('Required'),
});

export default function PersonalInfo({ handleClose }) {
  const [updateUser, result] = useUpdateUserMutation();
  const [edit, setEdit] = useState(true);
  const auth = useAuth();
  const dispatch = useDispatch();

  const initialValues = {
    id: auth.id,
    name: null,
    last_name: null,
    birth_date: null,
    identification: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validations,
    onSubmit: (values, { resetForm }) => {
      updateUser(values)
        .then(() => handleClose())
        .then(() =>
          Swal.fire({
            title: 'Update Data',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#5d3a00',
            /* cancelButtonColor: '#fe4450', */
            confirmButtonText: 'Yes, delete it!',
          }),
        )
        .then(() => {
          dispatch(updateUserInfo(values));
          setEdit(() => !edit);
        })
        .catch(() => Swal.fire('Upps!', 'You clicked the button!', 'error'))
        .finally(() => {
          handleClose();
          resetForm();
        });
    },
  });

  const { isValid } = formik;

  return (
    <Box component='form' autoComplete='on' noValidate onSubmit={formik.handleSubmit}>
      <Box>
        <Typography variant='h6' gutterBottom display={'flex'} alignItems={'center'} mb={2}>
          <BadgeIcon /> &nbsp;&nbsp;Personal information
          <Button onClick={() => setEdit(() => !edit)} color='secondary' startIcon={<EditIcon />}>
            {edit ? <u>edit</u> : <u>close</u>}
          </Button>
        </Typography>
      </Box>
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='name'
              name='name'
              label='First Name'
              fullWidth
              disabled={edit}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='last_name'
              name='last_name'
              label='Last Name'
              fullWidth
              disabled={edit}
              value={formik.values.last_name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.last_name && Boolean(formik.errors.last_name)}
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='identification'
              name='identification'
              label='Identification'
              fullWidth
              type='number'
              disabled={edit}
              value={formik.values.identification}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.identification && Boolean(formik.errors.identification)}
              helperText={formik.touched.identification && formik.errors.identification}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='birth_date'
              name='birth_date'
              type='date'
              fullWidth
              disabled={edit}
              value={formik.values.birth_date}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.birth_date && Boolean(formik.errors.birth_date)}
              helperText={formik.touched.birth_date && formik.errors.birth_date}
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
