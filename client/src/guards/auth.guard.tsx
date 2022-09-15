import { Outlet, Navigate } from 'react-router-dom';
import { PublicRoutes } from '../routes/routes';

function AuthGuard() {
  const storage = localStorage.getItem('user');
  const user = storage ? JSON.parse(storage) : {};
  return user.user ? <Outlet /> : <Navigate replace to={PublicRoutes.login} />;
}

export default AuthGuard;
