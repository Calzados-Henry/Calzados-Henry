import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import {
  getUsersByAdmin,
  logicDeleteUser,
  restoreDeletedUser,
} from '../../../features/admin/adminSlice';
import { Paper, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppDispatch, RootState } from '@/store';
import { useAuth } from '@/hooks/useAuth';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

function AddAdmin() {
  const dispatch = useDispatch<AppDispatch>();

  const userAuth = useAuth();
  console.log(userAuth);

  const { adminUsers, employeeUsers, normalUsers } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(getUsersByAdmin());
  }, []);

  // const handleFilter = (e, typeUser) => {
  //   console.log(e.target.value);
  //   typeUser?.filter(
  //     (el: any) =>
  //       String(el.id)?.includes(e.target.value) ||
  //       el.username?.includes(e.target.value) ||
  //       el.email?.includes(e.target.value) ||
  //       String(el.phone)?.includes(e.target.value) ||
  //       el.name?.includes(e.target.value) ||
  //       el.last_name?.includes(e.target.value),
  //   );
  // };
  // console.log(users);
  return (
    <>
      <Toaster position='bottom-left' gutter={8} />

      <Box sx={{ mt: 4 }}>
        {adminUsers.length ? (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                mt: 2,
                mb: 2,
              }}>
              <Typography variant='h5' color='secondary' sx={{ m: 1, p: 1 }}>
                Administradores:
              </Typography>
              {/* <Box sx={{ width: '50%' }}>
            <TextField fullWidth label='Filtrar usuarios' color='success' id='fullWidth' />
          </Box> */}
            </Box>
            {adminUsers?.map((e: any) => (
              <Paper
                elevation={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 1,
                }}>
                <Typography variant='body1' sx={{ m: 1, p: 1 }}>
                  {`${e.name} ${e.last_name}`}
                </Typography>
                <Typography variant='body2' sx={{ m: 1, p: 1 }}>
                  {e.email}
                </Typography>
                <Stack direction='row' spacing={3} sx={{ m: 1 }}>
                  <Chip
                    label={e.isActive ? 'Desactivate User' : 'Reactivate User'}
                    onClick={() => {
                      e.isActive
                        ? dispatch(logicDeleteUser(e.id, userAuth.token))
                        : dispatch(restoreDeletedUser(e.id, userAuth.token));
                    }}
                    color={e.isActive ? 'error' : 'success'}
                    onDelete={() => {
                      e.isActive
                        ? dispatch(logicDeleteUser(e.id, userAuth.token))
                        : dispatch(restoreDeletedUser(e.id, userAuth.token));
                    }}
                    deleteIcon={e.isActive ? <DeleteIcon /> : <PersonAddAltIcon />}
                    variant='outlined'
                  />
                </Stack>
              </Paper>
            ))}
          </>
        ) : (
          <div></div>
        )}

        {employeeUsers.length ? (
          <div>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                mt: 2,
                mb: 2,
              }}>
              <Typography variant='h5' color='secondary' sx={{ m: 1, p: 1 }}>
                Empleados:
              </Typography>
              {/* <Box sx={{ width: '50%' }}>
            <TextField fullWidth label='Filtrar usuarios' color='success' id='fullWidth' />
          </Box> */}
            </Box>
            {employeeUsers?.map((e: any) => (
              <Paper
                elevation={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 1,
                }}>
                <Typography variant='body1' sx={{ m: 1, p: 1 }}>
                  {`${e.name} ${e.last_name}`}
                </Typography>
                <Typography variant='body2' sx={{ m: 1, p: 1 }}>
                  {e.email}
                </Typography>

                <Stack direction='row' spacing={0} sx={{ m: 1 }}>
                  <Chip
                    label={e.isActive ? 'Desactivate User' : 'Reactivate User'}
                    onClick={() => {
                      e.isActive
                        ? dispatch(logicDeleteUser(e.id, userAuth.token))
                        : dispatch(restoreDeletedUser(e.id, userAuth.token));
                    }}
                    onDelete={() => {
                      e.isActive
                        ? dispatch(logicDeleteUser(e.id, userAuth.token))
                        : dispatch(restoreDeletedUser(e.id, userAuth.token));
                    }}
                    color={e.isActive ? 'error' : 'success'}
                    deleteIcon={e.isActive ? <DeleteIcon /> : <PersonAddAltIcon />}
                    variant='outlined'
                  />
                </Stack>
              </Paper>
            ))}
          </div>
        ) : (
          <div></div>
        )}

        {normalUsers.length ? (
          <>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '100%',
                  mt: 2,
                  mb: 2,
                }}>
                <Typography variant='h5' color='secondary' sx={{ m: 1, p: 1 }}>
                  Usuarios:
                </Typography>
                {/* <Box sx={{ width: '50%' }}>
            <TextField fullWidth label='Filtrar usuarios' color='success' id='fullWidth' />
          </Box> */}
              </Box>
              {normalUsers?.map((e: any) => (
                <Paper
                  elevation={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 1,
                  }}>
                  <Typography variant='body1' sx={{ m: 1, p: 1 }}>
                    {`${e.name} ${e.last_name}`}
                  </Typography>
                  <Typography variant='body2' sx={{ m: 1, p: 1 }}>
                    {e.email}
                  </Typography>

                  <Stack direction='row' spacing={0} sx={{ m: 1 }}>
                    <Chip
                      label={e.isActive ? 'Desactivate User' : 'Reactivate User'}
                      onClick={() => {
                        e.isActive
                          ? dispatch(logicDeleteUser(e.id, userAuth.token))
                          : dispatch(restoreDeletedUser(e.id, userAuth.token));
                      }}
                      onDelete={() => {
                        e.isActive
                          ? dispatch(logicDeleteUser(e.id, userAuth.token))
                          : dispatch(restoreDeletedUser(e.id, userAuth.token));
                      }}
                      deleteIcon={e.isActive ? <DeleteIcon /> : <PersonAddAltIcon />}
                      variant='outlined'
                      color={e.isActive ? 'error' : 'success'}
                    />
                  </Stack>
                </Paper>
              ))}
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

export default AddAdmin;
