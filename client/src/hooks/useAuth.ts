import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../features/auth/authSlice';

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken)
  return useMemo(() => ({ user, token }), [user, token]);
};
