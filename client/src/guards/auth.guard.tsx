import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PublicRoutes } from '../routes/routes';
import { useAuth } from '../hooks/useAuth';

function AuthGuard() {
  const storage = window.localStorage?.getItem('user');
  const user = storage ? JSON.parse(storage) : {};

  return user.name ? <Outlet /> : <Navigate replace to={PublicRoutes.login} />;
}

export default AuthGuard;
