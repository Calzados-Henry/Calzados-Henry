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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Logout, AppRegistration, Settings, LoginOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../features/auth/authSlice';
import { useAuth } from '../../hooks/useAuth';
import { PublicRoutes, PrivatesRoutes } from '@/routes/routes';
import { reset } from '@/features/cart/cartApiSlice';
import { resetUserInfo } from '@/features/user/userSlice';

export default function User() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storage = window.localStorage?.getItem('user');
  const userAuth = storage ? JSON.parse(storage) : {};

  const initial = {
    id: null,
    username: null,
    name: null,
    last_name: null,
    birth_date: null,
    phone: null,
    identification: null,
  };

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(initial);
  const [openDial, setOpenDial] = useState(false);
  const handleOpenBackdrop = () => setOpenDial(true);
  const handleCloseBackdrop = () => setOpenDial(false);

  useEffect(() => {
    const local = window.localStorage.getItem('userInfo');
    if (local) {
      setUser(JSON.parse(local));
      setLogin(true);
    } else {
      setUser(initial);
    }
  }, [openDial]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    handleOpenBackdrop();
  };
  const handleClose = () => {
    setAnchorEl(null);
    handleCloseBackdrop();
  };

  const renderMenuSign = () => {
    return (
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
        <MenuItem onClick={() => navigate(PublicRoutes.login)}>
          <ListItemIcon>
            <LoginOutlined fontSize='small' />
          </ListItemIcon>
          Sign In
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate(PublicRoutes.register)}>
          <ListItemIcon>
            <AppRegistration fontSize='small' />
          </ListItemIcon>
          Sign up
        </MenuItem>
      </Menu>
    );
  };

  const renderMenuLogged = () => {
    return (
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
        <MenuItem onClick={() => navigate(`${PrivatesRoutes.settings}/${PrivatesRoutes.profile}`)}>
          <Avatar />
          {user.name} {user.last_name}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate(`${PrivatesRoutes.settings}/${PrivatesRoutes.profile}`)}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>

        {userAuth?.rol === 'Administrator' ? (
          <MenuItem onClick={() => navigate(`${PrivatesRoutes.dashboard}`)}>
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize='small' />
            </ListItemIcon>
            Dashboard
          </MenuItem>
        ) : (
          <div></div>
        )}

        <MenuItem
          onClick={() => {
            setLogin(false);
            dispatch(reset());
            dispatch(resetUser());
            dispatch(resetUserInfo());
            navigate(PublicRoutes.home);
          }}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    );
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
      {!login && renderMenuSign()}
      {login && renderMenuLogged()}
    </>
  );
}
