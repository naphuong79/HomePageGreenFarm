import { isRejectedWithValue } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../features/Auth/authSlice';

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 401) {
      // Reset the store (not working)
      const dispatch = useDispatch();
      dispatch(logout());

      // Forward to login-screen (not working)
      const navigation = useNavigate();
      navigation.push('/login');
    }
  }
  return next(action);
};
