import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser, selectorCurrentUserId } from '../features/auth/authSlice';

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken)
  const id = useSelector(selectorCurrentUserId)
  return useMemo(() => ({ id,user, token }), [id,user, token]);
};
