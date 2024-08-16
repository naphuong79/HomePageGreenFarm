import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export function NotLoggedMiddleware() {
  const auth = useSelector((state) => state.auth);
  return auth.loggedIn && auth.accessToken ? <Navigate to="/" replace /> : <Outlet />;
}
