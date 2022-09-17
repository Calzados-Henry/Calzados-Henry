import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, TextField, Button, Backdrop, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { PublicRoutes, URL } from '@/routes/routes';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const validations = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Should have at least 8 characters!')
    .max(18, 'Cant be longer than 18 characters!')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password should be equals')
    .required('Password is required'),
});

function ResetPassword() {
  const [id] = window.location.href.split('=').slice(1, 2);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById('formSubmit')?.click();
  }, []);

  const handleOpenBackdrop = () => setOpenBackdrop(true);
  const handleCloseBackdrop = () => setOpenBackdrop(false);

  const newPasswordValidation = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: validations,
    onSubmit: () => {
      handleOpenBackdrop();
      axios
        .put(`${URL.baseURL}/users`, {
          id: Number(id),
          password: newPasswordValidation.values.password,
        })
        .then(res => {
          handleCloseBackdrop();
          console.log(res);
          Swal.fire({
            title: 'Contraseña cambiada exitosamente',
            text: 'Inicie sesión para continuar su compra.',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            navigate(PublicRoutes.login);
          }, 2200);
        })
        .catch(() => {
          handleCloseBackdrop();
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error!',
            icon: 'error',
            confirmButtonText: 'Intentalo de nuevo!',
          });
        });
    },
  });
  return (
    <>
      <Box
        component='form'
        noValidate
        onSubmit={newPasswordValidation.handleSubmit}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={openBackdrop}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <Paper elevation={15} sx={{ borderRadius: 4, width: '80%' }}>
          <Box
            sx={{
              m: 2,
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'column',
              height: 300,
            }}>
            <TextField
              label='New Password'
              placeholder='Select a new password'
              id='password'
              name='password'
              type='password'
              value={newPasswordValidation.values.password}
              onChange={newPasswordValidation.handleChange}
              error={
                newPasswordValidation.touched.password &&
                Boolean(newPasswordValidation.errors.password)
              }
              helperText={
                newPasswordValidation.touched.password && newPasswordValidation.errors.password
              }
              autoComplete='password'></TextField>

            <TextField
              label='Verify Password'
              placeholder='Verify your new password'
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              value={newPasswordValidation.values.confirmPassword}
              onChange={newPasswordValidation.handleChange}
              error={
                newPasswordValidation.touched.confirmPassword &&
                Boolean(newPasswordValidation.errors.confirmPassword)
              }
              helperText={
                newPasswordValidation.touched.confirmPassword &&
                newPasswordValidation.errors.confirmPassword
              }></TextField>
            <Button type='submit' id='formSubmit' variant='contained'>
              Cambiar contraseña
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default ResetPassword;
