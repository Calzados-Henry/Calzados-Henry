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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
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
import { PublicRoutes } from '../../routes/routes';
import { deleteAllfromLS } from '../../features/cart/CartSlice';
import { getApiUserCart, setApiUserCart } from '../../features/cart/cartApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

import { initial, clientId, style } from './utils';

const validations = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const googleValidation = yup.object().shape({
  userName: yup.string().required('Username is required'),
  phone: yup.number().required('Phone number is required'),
  identification: yup.number().required('Identification is required'),
  birth_date: yup.date().required('Birthdate is required'),
});

export default function Login() {
  const paperstyle = { padding: 20, height: '90vh', width: 400, margin: '100px auto' };
  const { loading, products, error } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchAsync: any = useDispatch();
  const auth = useAuth();
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();
  const [checked, setChecked] = useState(true);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [googleData, setGoogleData] = useState({});
  const [openBackDrop, setOpenBackDrop] = useState(false);

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({ clientId });
    });

    if (auth.user) {
      navigate(PublicRoutes.home);
    }
  }, []);

  const successLogin = (res: any) => {
    handleCloseBackDrop();
    setGoogleData(res);

    googleLogin.setValues({
      ...googleLogin.values,
      name: res.profileObj.givenName,
      last_name: res.profileObj.familyName,
      email: res.profileObj.email,
      password: res.googleId,
    });
    handleOpenLoginModal();
  };

  const errorLogin = (response: any) => {
    handleCloseBackDrop();

    console.log(response);
  };

  const loadingStatus = () => {
    handleOpenBackDrop();
  };

  //BACKDROP
  const handleCloseBackDrop = () => setOpenBackDrop(false);
  const handleOpenBackDrop = () => setOpenBackDrop(true);

  //MODAL REGISTRO
  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);

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
      const data: any = await login(dataLogin).unwrap();

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
        if (products.length) {
          if (data.id && data.token) {
            dispatchAsync(setApiUserCart({ id: data.id, products, token: data.token }));
            dispatch(deleteAllfromLS());
          }
        }
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: `Welcome! ${data.name} ${data.last_name}, you will be redirect`,
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          navigate(PublicRoutes.home);
        }, 1200);
        if (!checked) {
          setTimeout(() => {
            dispatch(resetUser());
            window.location.reload();
          }, 10000);
        }
        dispatchAsync(getApiUserCart(data.id));
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

  const googleLogin = useFormik({
    initialValues: initial,
    validationSchema: googleValidation,
    onSubmit: () => {
      console.log(googleLogin.values, googleData);
      // Swal.fire({
      //   title: 'Success!',
      //   icon: 'success',
      //   text: `Welcome! , you will be redirect`,
      //   showConfirmButton: false,
      //   timer: 1000,
      // });
      handleCloseLoginModal();
      handleOpenBackDrop();
    },
  });
  console.log(googleLogin.values);

  return (
    <Grid alignContent={'center'}>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
        onClick={handleCloseBackDrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
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
              <Checkbox
                name='checked'
                checked
                color='primary'
                onChange={() => setChecked(!checked)}
              />
            }
            label='Remember me'
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Typography variant='body1' color='initial' sx={{ mt: 2, mb: 2 }}>
              Inicia sesión con Google
            </Typography>

            <GoogleLogin
              clientId={`${clientId}`}
              // buttonText='Login'
              onSuccess={successLogin}
              onFailure={errorLogin}
              onRequest={loadingStatus}
              cookiePolicy={'single_host_origin'}
            />
          </Box>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>

          {/* <Link to='/recoverPass' style={{ textDecoration: 'underline', color: 'blue' }}>
            Forgot Password?
          </Link> */}
          <Typography>
            Don't have account?
            <Link to='/register' style={{ textDecoration: 'underline', color: 'blue' }}>
              Register now!
            </Link>
          </Typography>
        </Paper>

        <Modal
          open={openLoginModal}
          onClose={handleCloseLoginModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Su login fue exitoso!
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              Complete unos pocos pasos mas para terminar el registro!
            </Typography>

            <Box component='form' noValidate onSubmit={googleLogin.handleSubmit} sx={{ m: 3 }}>
              <Paper elevation={4} sx={{ borderRadius: 4 }}>
                <Box sx={{ m: 2 }}>
                  <TextField
                    label='Username'
                    sx={{ mt: 3 }}
                    placeholder='Enter an username...'
                    fullWidth
                    id='userName'
                    name='userName'
                    value={googleLogin.values.userName}
                    onChange={googleLogin.handleChange}
                    error={googleLogin.touched.userName && Boolean(googleLogin.errors.userName)}
                    helperText={googleLogin.touched.userName && googleLogin.errors.userName}
                    autoComplete='username'></TextField>

                  <Grid container spacing={1} sx={{ mt: 3 }}>
                    <Grid item xs={5}>
                      <TextField
                        sx={{ width: '100%' }}
                        id='birth_date'
                        label='Birthdate'
                        type='date'
                        value={googleLogin.values.birth_date}
                        onChange={googleLogin.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <TextField
                        label='Phone'
                        placeholder='Enter phone...'
                        type='number'
                        sx={{ marginBottom: 4 }}
                        fullWidth
                        id='phone'
                        name='phone'
                        value={googleLogin.values.phone}
                        onChange={googleLogin.handleChange}
                        error={googleLogin.touched.phone && Boolean(googleLogin.errors.phone)}
                        helperText={
                          googleLogin.touched.phone && googleLogin.errors.phone
                        }></TextField>
                    </Grid>
                  </Grid>
                  <TextField
                    label='Identification'
                    placeholder='Enter your DNI/CC...'
                    type='number'
                    fullWidth
                    id='identification'
                    name='identification'
                    value={googleLogin.values.identification}
                    onChange={googleLogin.handleChange}
                    error={
                      googleLogin.touched.identification &&
                      Boolean(googleLogin.errors.identification)
                    }
                    helperText={
                      googleLogin.touched.identification && googleLogin.errors.identification
                    }></TextField>
                  <Button type='submit' id='formSubmit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Ya casi estamos!!!
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Grid>
  );
}
