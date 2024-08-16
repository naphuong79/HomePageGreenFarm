import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { logout } from "../../features/Auth/authSlice";

function PrivateRoute({ allowedRoles = [] }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth.loggedIn) {
            const token_decode = jwtDecode(auth.accessToken);
            if (token_decode.exp * 1000 < Date.now()) dispatch(logout());
        }
    }, [location.pathname]);

    const authorized =
        allowedRoles.length > 0
            ? allowedRoles.find((role) =>
                    auth?.currentUser?.role?.includes(role),
                )
            : true;
    return auth.loggedIn && auth.accessToken ? (
        authorized ? (
            <Outlet />
        ) : (
            <div className="min-h-screen flex items-center justify-center text-slate-500">
                <p>403 | Forbidden</p>
            </div>
        )
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default PrivateRoute;
