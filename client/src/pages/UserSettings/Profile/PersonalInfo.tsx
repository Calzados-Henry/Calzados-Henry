/* eslint-disable camelcase */
import { Fragment, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import BadgeIcon from '@mui/icons-material/Badge';
import { useCreateAddressMutation } from '@/features/user/address/addressApiSlice';
import { RootState } from '@/store';
import EditIcon from '@mui/icons-material/Edit';
import { UserPersonalInfoForm } from '@/sehostypes/User';
import * as yup from 'yup';

const validations = yup.object({
  name: yup.string().required('Username is required'),
  last_name: yup.string().required('Username is required'),
  identification: yup.number().nullable(true).required('Number is required'),
  birth_date: yup.date().required('BirthDate is required'),
});

export default function PersonalInfo() {
  const [createAddress] = useCreateAddressMutation();
  const [edit, setEdit] = useState(true);

  const {
    id: userId,
    name,
    last_name,
    birth_date,
    identification,
  }: UserPersonalInfoForm = useSelector((state: RootState) => state.user);

  const formik = useFormik({
    initialValues: { userId, name, last_name, birth_date, identification },
    validationSchema: validations,
    onSubmit: values => {
      /* createAddress(values); */
      setEdit(() => !edit);
      console.log(values);
    },
  });
  const { isValid } = formik;
  return (
    <Fragment>
      <Box component='form' noValidate onSubmit={formik.handleSubmit}>
        <Box>
          <Typography variant='h6' gutterBottom display={'flex'} alignItems={'center'} mb={2}>
            <BadgeIcon /> &nbsp;&nbsp;Personal information
            <Button onClick={() => setEdit(() => !edit)} color='secondary' startIcon={<EditIcon />}>
              {edit ? <u>edit</u> : <u>close</u>}
            </Button>
          </Typography>
        </Box>
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
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
