import { useState, Fragment, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { PublicRoutes } from '../../routes/routes';
import toast, { Toaster } from 'react-hot-toast';
import { updateCheckoutInfo } from '../../features/checkout/checkoutSlice';
import { useDispatch } from 'react-redux';
import { Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import { LocalShipping } from '@mui/icons-material';

const validations = yup.object({
  firstName: yup.string().max(12, 'No more than 20 characters').required('First Name is required'),
  lastName: yup.string().max(12, 'No more than 20 characters').required('Last Name is required'),
  address: yup.string().max(20, 'No more than 20 characters').required('address is required'),
  country: yup.string().max(20, 'No more than 20 characters').required('country is required'),
  state: yup.string().max(20, 'No more than 20 characters').required(),
  city: yup.string().max(20, 'No more than 20 characters').required('city is required'),
  zip: yup
    .string()
    .max(20, 'No more than 20 characters')
    .required('zip code, postal code is required'),
});

export default function AddressForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      country: '',
      state: '',
      city: '',
      zip: '',
    },
    validationSchema: validations,
    onSubmit: values => {
      /* toast.promise(promise, {
        loading: <b>Enviando datos</b>,
        success: <b>La información fue enviada satisfactoriamente</b>,
        error: <b>Error ocurrido durante la ejecución</b>,
      }); */
    },
  });

  useEffect(() => {
    dispatch(updateCheckoutInfo(formik.values));
  });

  return (
    <Fragment>
      <Typography variant='h6' gutterBottom display={'flex'} alignItems={'center'}>
        <LocalShipping /> &nbsp;&nbsp;Shipping address
      </Typography>

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
    </Fragment>
  );
}
