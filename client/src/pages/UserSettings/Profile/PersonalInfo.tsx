/* eslint-disable camelcase */
import { useGetUserByIdQuery, useUpdateUserMutation } from '@/features/user/userApiSlice';
import { useAuth } from '@/hooks/useAuth';
import BadgeIcon from '@mui/icons-material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { Fragment, useState } from 'react';
import * as yup from 'yup';

const validations = yup.object({
  name: yup.string().required('Username is required'),
  last_name: yup.string().required('Username is required'),
  identification: yup.number().nullable(true).required('Number is required'),
  birth_date: yup.date().required('BirthDate is required'),
});

export default function PersonalInfo() {
  const [updateUser, result] = useUpdateUserMutation();
  const [edit, setEdit] = useState(true);
  const auth = useAuth();
  const { data: user, isLoading, isSuccess, isError } = useGetUserByIdQuery(auth.id);

  const formik = useFormik({
    initialValues: {
      id: auth.id,
      name: user?.name,
      last_name: user?.last_name,
      birth_date: user?.birth_date,
      identification: user?.identification,
    },
    validationSchema: validations,
    onSubmit: values => {
      updateUser(values);
      setEdit(() => !edit);
    },
  });
  const { isValid } = formik;

  let content;
  if (isLoading) content = <CircularProgress color='secondary' />;
  if (isSuccess && user)
    content = (
      <Fragment>
        <Box component='form' noValidate onSubmit={formik.handleSubmit}>
          <Box>
            <Typography variant='h6' gutterBottom display={'flex'} alignItems={'center'} mb={2}>
              <BadgeIcon /> &nbsp;&nbsp;Personal information
              <Button
                onClick={() => setEdit(() => !edit)}
                color='secondary'
                startIcon={<EditIcon />}>
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
                  required
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
                  required
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
                  disabled={edit}
                  autoComplete='shipping address-level2'
                  value={formik.values.identification}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.identification && Boolean(formik.errors.identification)}
                  helperText={formik.touched.identification && formik.errors.identification}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id='birth_date'
                  name='birth_date'
                  label='Birth Date'
                  type='date'
                  fullWidth
                  disabled={edit}
                  defaultValue='2017-05-24'
                  autoComplete='shipping postal-code'
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
                  {result.isLoading ? <CircularProgress size={20} color='secondary' /> : 'update'}
                </Button>
              </Grid>
            </Grid>
          </>
        </Box>
      </Fragment>
    );
  if (isError) <>Error</>;
  return <>{content}</>;
}
