import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginRequest, useLoginMutation } from '../../features/auth/authApiSlice';
import { createUser, resetUser } from '../../features/auth/authSlice';
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const validations = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function Login() {
  const paperstyle = { padding: 20, height: '70vh', width: 400, margin: '100px auto' };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    if (user) {
      window.history.back();
    }
  }, []);

  const formik = useFormik<LoginRequest>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validations,
    onSubmit: async () => {
      const dataLogin = {
        email: formik.values.email,
        password: formik.values.password,
      };
      const data = await login(dataLogin).unwrap();

      if (!data.message) {
        const userAuth = {
          user: data.email,
          rol: data.type_user,
          token: data.token,
        };
        const userInfo = {
          id: data.id,
          username: data.username,
          name: data.name,
          last_name: data.last_name,
          birth_date: data.birth_date,
          phone: data.phone,
          identification: data.identification,
        };
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
        dispatch(createUser(userAuth));
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: `Welcome! ${data.name} ${data.last_name}, you will be redirect`,
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          window.history.back();
        }, 1200);
        if (!checked) {
          setTimeout(() => {
            dispatch(resetUser());
            window.location.reload();
          }, 600000);
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'Try again!',
        });
      }
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
            label='Email'
            placeholder='Enter your email...'
            fullWidth
            id='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoComplete='email'></TextField>
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
            helperText={formik.touched.password && formik.errors.password}
            autoComplete='password'></TextField>
          <FormControlLabel
            control={
              <Checkbox name='checked' color='primary' onChange={() => setChecked(!checked)} />
            }
            label='Remember me'
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>

          <Link to='/recoverPass' style={{ textDecoration: 'underline', color: 'blue' }}>
            Forgot Password?
          </Link>
          <Typography>
            Don&apost have account?
            <Link to='/register' style={{ textDecoration: 'underline', color: 'blue' }}>
              Register now!
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Grid>
  );
}
