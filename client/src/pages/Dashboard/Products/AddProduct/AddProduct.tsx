import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import Copyright from '../../../../components/Copyright/Copyright';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

/* VALIDACIONES */
const validations = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Desc is required'),
});
const theme = createTheme();

/* COMPONENT */
export default function AddProduct() {
  /* FORMIK */
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: validations,
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* NAME */}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='name'
                required
                fullWidth
                id='name'
                label='Name'
                autoFocus
              />
            </Grid>
            {/* DESCRIPTION */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name='description'
                id='description'
                label='description'
                autoComplete='family-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='#' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
