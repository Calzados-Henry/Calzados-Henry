import { useState, Fragment, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { setStepOneInfo, resetCheck } from '@/features/checkout/checkoutSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import { LocalShipping } from '@mui/icons-material';
import { RootState } from '@/store';
import * as yup from 'yup';

const validations = yup.object({
  firstName: yup.string().max(20, 'No more than 20 characters').required('First Name is required'),
  lastName: yup.string().max(20, 'No more than 20 characters').required('Last Name is required'),
  address: yup.string().max(20, 'No more than 20 characters').required('address is required'),
  country: yup
    .string()
    .min(4)
    .max(20, 'No more than 20 characters')
    .required('country is required'),
  state: yup.string().max(20, 'No more than 20 characters').required('state is required'),
  city: yup.string().max(20, 'No more than 20 characters').required('city is required'),
  zip: yup
    .string()
    .max(20, 'No more than 20 characters')
    .required('zip code, postal code is required'),
});

export default function AddressForm() {
  const dispatch = useDispatch();
  const initialValues = useSelector((state: RootState) => state.checkout.stepOne);
  useEffect(() => {
    dispatch(resetCheck());
  }, []);
  const formik = useFormik({
    initialValues,
    validationSchema: validations,
    onSubmit: values => {
      dispatch(setStepOneInfo(values));
    },
  });
  const { isValid } = formik;
  return (
    <Fragment>
      <Typography variant='h6' gutterBottom display={'flex'} alignItems={'center'} mb={2}>
        <LocalShipping /> &nbsp;&nbsp;Shipping address
      </Typography>

      <Box component='form' noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='firstName'
              name='firstName'
              label='First name'
              fullWidth
              autoComplete='given-name'
              value={formik.values.firstName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='lastName'
              name='lastName'
              label='Last name'
              fullWidth
              autoComplete='family-name'
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
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
              id='zip'
              name='zip'
              label='Zip / Postal code'
              fullWidth
              autoComplete='shipping postal-code'
              value={formik.values.zip}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='country'
              name='country'
              label='Country'
              fullWidth
              autoComplete='shipping country'
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
        </Grid>
        <Grid container textAlign='center' mt={2}>
          <Grid item xs={12} sm={4}>
            <Typography>1. Provide Data.</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>2. Update Info.</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>3. Click the &quot;Next&quot; button.</Typography>
          </Grid>
        </Grid>

        <Button
          size='large'
          type='submit'
          color='secondary'
          variant='contained'
          fullWidth
          disabled={!isValid}
          sx={{ mt: 3, mb: 2 }}>
          Update Info
        </Button>
      </Box>
    </Fragment>
  );
}
