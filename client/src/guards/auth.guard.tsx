import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PublicRoutes } from '../routes/routes';
import { useAuth } from '../hooks/useAuth';

function AuthGuard() {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate replace to={PublicRoutes.login} />;
}

export default AuthGuard;
