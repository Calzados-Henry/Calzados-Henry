import React, { useEffect, useState } from 'react';

import {
  Avatar,
  Box,
  Backdrop,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';

import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { removeCredentials, setCredentials } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function User() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initial = {
    id: null,
    username: null,
    name: null,
    last_name: null,
    birth_date: null,
    phone: null,
    identification: null,
  }

  const [login, setLogin] = useState(false)
  const [user, setUser] = useState(initial)
  const [openDial, setOpenDial] = React.useState(false);
  const handleOpenBackdrop = () => setOpenDial(true);
  const handleCloseBackdrop = () => setOpenDial(false);

  useEffect(() => {
    const local = window.localStorage.getItem('userInfo')
    if(local) {
      setUser(JSON.parse(local))
      setLogin(true)
    } else {
      setUser(initial)
    }
    console.log('cambio')
  }, [openDial])


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    handleOpenBackdrop();
  };
  const handleClose = () => {
    setAnchorEl(null);
    handleCloseBackdrop();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Backdrop open={openDial} />
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}>
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 3,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem onClick={() => login ? navigate('/profile') : navigate('/Login')}>
          <Avatar /> {login ? `${user.name} ${user.last_name}` : 'Sign In'}
        </MenuItem>
        {!login && <><MenuItem><Avatar />Register</MenuItem></>}
        {login && 
        <>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize='small' />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => {
          setLogin(false)
          dispatch(removeCredentials())}
          }>
          <ListItemIcon >
            <Logout fontSize='small'/>
          </ListItemIcon>
          Logout
        </MenuItem></>}
      </Menu>
    </>
  );
}
