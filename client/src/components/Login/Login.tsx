import { Grid, Paper, Avatar, TextField, Button, Box, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { PublicRoutes } from '../../routes/routes';

const validations = yup.object({
  userName: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Last Name is required'),
});

export default function Login() {
  const paperstyle = { padding: 20, height: '70vh', width: 400, margin: '100px auto' };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: validations,
    onSubmit: () => {
      fetch('http://localhost:3001/users/')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
        .finally(() => {
          navigate(PublicRoutes.home);
        });
    },
  });

  return (
    <Grid alignContent={'center'}>
      <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <Paper elevation={10} style={paperstyle}>
          <Grid>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <LockOutlined />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <TextField
            sx={{ marginTop: 5, marginBottom: 5 }}
            label='Username'
            placeholder='Enter username...'
            fullWidth
            id='userName'
            name='userName'
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}></TextField>
          <TextField
            sx={{ marginBottom: 5 }}
            label='Password'
            placeholder='Enter password...'
            type='password'
            fullWidth
            id='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}></TextField>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
          <Link to='/recoverPass' style={{ textDecoration: 'underline', color: 'blue' }}>
            Forgot Password?
          </Link>
        </Paper>
      </Box>
    </Grid>
  );
}
