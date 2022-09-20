import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import {
  changeAdminType,
  getUsersByAdmin,
  logicDeleteUser,
  restoreDeletedUser,
  User,
} from '../../../features/admin/adminSlice';
import { Paper, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppDispatch, RootState } from '@/store';
import { useAuth } from '@/hooks/useAuth';
import Swal from 'sweetalert2';

function AddAdmin() {
  const dispatch = useDispatch<AppDispatch>();

  const userAuth = useAuth();

  const ADMIN = 'Administrator';

  const { adminUsers, employeeUsers, normalUsers } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(getUsersByAdmin());
  }, []);

  const changeAdminRole = (user: User) => {
    user.type_user === 'Administrator'
      ? Swal.fire({
          text: 'Retirar permisos de Administrador?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si!',
          cancelButtonText: 'No!',
        }).then(res => {
          if (res.isConfirmed) dispatch(changeAdminType(user));
        })
      : Swal.fire({
          text: 'Dar permisos de Administrador?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si!',
          cancelButtonText: 'No!',
        }).then(res => {
          if (res.isConfirmed) dispatch(changeAdminType(user));
        });
  };

  const onClickAction = (user: User) => {
    const id: number = user.id;

    user.isActive
      ? Swal.fire({
          text: 'Quieres dar de baja a este usuario?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si!',
          cancelButtonText: 'No!',
        }).then(res => {
          if (res.isConfirmed) dispatch(logicDeleteUser(id));
        })
      : Swal.fire({
          text: 'Quieres dar de alta a este usuario?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si!',
          cancelButtonText: 'No!',
        }).then(res => {
          if (res.isConfirmed) dispatch(restoreDeletedUser(id));
        });
  };

  return (
    <>
      <Toaster position='bottom-left' gutter={8} />

      <Box sx={{ mt: 4 }}>
        {adminUsers?.length ? (
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
                <Box sx={{ width: '33%' }}>
                  <Typography variant='body1' sx={{ m: 1, p: 1 }}>
                    {`${e.name} ${e.last_name}`}
                  </Typography>
                </Box>
                <Box sx={{ width: '33%' }}>
                  <Typography variant='body2' sx={{ m: 1, p: 1 }}>
                    {e.email}
                  </Typography>
                </Box>

                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Stack direction='row' spacing={0} sx={{ m: 1 }}>
                    <Chip
                      label={e.type_user !== ADMIN ? 'Add Admin' : 'Eliminate Admin'}
                      onClick={() => changeAdminRole(e)}
                      onDelete={() => changeAdminRole(e)}
                      deleteIcon={e.type_user === ADMIN ? <DeleteIcon /> : <PersonAddAltIcon />}
                      variant='outlined'
                      color={e.type_user === ADMIN ? 'error' : 'success'}
                    />
                  </Stack>
                  <Stack direction='row' spacing={0} sx={{ m: 1 }}>
                    <Chip
                      label={e.isActive ? 'Desactivate User' : 'Reactivate User'}
                      onClick={() => onClickAction(e)}
                      onDelete={() => onClickAction(e)}
                      deleteIcon={e.isActive ? <DeleteIcon /> : <PersonAddAltIcon />}
                      variant='outlined'
                      color={e.isActive ? 'error' : 'success'}
                    />
                  </Stack>
                </Box>
              </Paper>
            ))}
          </>
        ) : (
          <div></div>
        )}

        {employeeUsers?.length ? (
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
                <Box sx={{ width: '33%' }}>
                  <Typography variant='body1' sx={{ m: 1, p: 1 }}>
                    {`${e.name} ${e.last_name}`}
                  </Typography>
                </Box>
                <Box sx={{ width: '33%' }}>
                  <Typography variant='body2' sx={{ m: 1, p: 1 }}>
                    {e.email}
                  </Typography>
                </Box>

                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Stack direction='row' spacing={0} sx={{ m: 1 }}>
                    <Chip
                      label={e.type_user !== ADMIN ? 'Add Admin' : 'Eliminate Admin'}
                      onClick={() => changeAdminRole(e)}
                      onDelete={() => changeAdminRole(e)}
                      deleteIcon={e.type_user === ADMIN ? <DeleteIcon /> : <PersonAddAltIcon />}
                      variant='outlined'
                      color={e.type_user === ADMIN ? 'error' : 'success'}
                    />
                  </Stack>

                  <Stack direction='row' spacing={0} sx={{ m: 1 }}>
                    <Chip
                      label={e.isActive ? 'Desactivate User' : 'Reactivate User'}
                      onClick={() => onClickAction(e)}
                      onDelete={() => onClickAction(e)}
                      deleteIcon={e.isActive ? <DeleteIcon /> : <PersonAddAltIcon />}
                      variant='outlined'
                      color={e.isActive ? 'error' : 'success'}
                    />
                  </Stack>
                </Box>
              </Paper>
            ))}
          </div>
        ) : (
          <div></div>
        )}

        {normalUsers?.length ? (
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
                  <Box sx={{ width: '33%' }}>
                    <Typography variant='body1' sx={{ m: 1, p: 1 }}>
                      {`${e.name} ${e.last_name}`}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '33%' }}>
                    <Typography variant='body2' sx={{ m: 1, p: 1 }}>
                      {e.email}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction='row' spacing={0} sx={{ m: 1 }}>
                      <Chip
                        label={e.type_user !== ADMIN ? 'Add Admin' : 'Eliminate Admin'}
                        onClick={() => changeAdminRole(e)}
                        onDelete={() => changeAdminRole(e)}
                        deleteIcon={e.type_user === ADMIN ? <DeleteIcon /> : <PersonAddAltIcon />}
                        variant='outlined'
                        color={e.type_user === ADMIN ? 'error' : 'success'}
                      />
                    </Stack>
                    <Stack direction='row' spacing={0} sx={{ m: 1 }}>
                      <Chip
                        label={e.isActive ? 'Desactivate User' : 'Reactivate User'}
                        onClick={() => onClickAction(e)}
                        onDelete={() => onClickAction(e)}
                        deleteIcon={e.isActive ? <DeleteIcon /> : <PersonAddAltIcon />}
                        variant='outlined'
                        color={e.isActive ? 'error' : 'success'}
                      />
                    </Stack>
                  </Box>
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
