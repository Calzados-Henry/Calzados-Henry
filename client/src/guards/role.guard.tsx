import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PublicRoutes } from '../routes/routes';
import { useAuth } from '../hooks/useAuth';

function RoleGuard() {
  const auth = useAuth();
  const storage = window.localStorage?.getItem('user');
  const user = storage ? JSON.parse(storage) : {};

  return user.rol === 'Administrator' || user.rol === 'Employee' ? (
    <Outlet />
  ) : (
    <Navigate replace to={PublicRoutes.products} />
  );
}

export default RoleGuard;
