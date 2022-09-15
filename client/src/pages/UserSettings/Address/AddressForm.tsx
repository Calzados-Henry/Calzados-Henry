import { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import { LocalShipping } from '@mui/icons-material';
import { useCreateAddressMutation } from '@/features/user/address/addressApiSlice';
import { useAuth } from '@/hooks/useAuth';
import * as yup from 'yup';

const validations = yup.object({
  address: yup.string().max(80, 'No more than 20 characters').required('address is required'),
  state: yup.string().max(20, 'No more than 20 characters').required('state is required'),
  city: yup.string().max(20, 'No more than 20 characters').required('city is required'),
  zip_code: yup
    .string()
    .max(20, 'No more than 20 characters')
    .required('zip code, postal code is required'),
});

export default function AddressForm() {
  const [createAddress, { data, isLoading }] = useCreateAddressMutation();
  const { id } = useAuth();

  const formik = useFormik({
    initialValues: {
      id,
      title: '',
      state: '',
      city: '',
      address: '',
      zip_code: '',
    },
    validationSchema: validations,
    onSubmit: async newAddres => {
      await createAddress(newAddres);
      console.log(newAddres);
    },
  });
  const { isValid } = formik;
  return (
    <Fragment>
      <Box component='form' noValidate onSubmit={formik.handleSubmit}>
        <Typography variant='h6' gutterBottom display={'flex'} alignItems={'center'} mb={2}>
          <LocalShipping /> &nbsp;&nbsp;Add New Address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='title'
              name='title'
              label='Address title'
              fullWidth
              value={formik.values.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='state'
              name='state'
              label='State/Province/Region'
              fullWidth
              value={formik.values.state}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='city'
              name='city'
              label='City'
              fullWidth
              autoComplete='shipping address-level2'
              value={formik.values.city}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='zip_code'
              name='zip_code'
              label='Zip / Postal code'
              fullWidth
              autoComplete='shipping postal-code'
              value={formik.values.zip_code}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
              helperText={formik.touched.zip_code && formik.errors.zip_code}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id='address'
              name='address'
              label='Address'
              fullWidth
              autoComplete='shipping address-line1'
              value={formik.values.address}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
        </Grid>

        <Box display='flex' justifyContent='end'>
          <Button
            size='small'
            type='submit'
            color='secondary'
            variant='contained'
            disabled={!isValid || isLoading}
            sx={{ mt: 3, mb: 2 }}>
            {isLoading ? 'loading' : 'Add Address'}
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
}
