import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = ({token, children}) => {
    return token ? children: <Navigate to='/login' />;
}

const ProtectedRoutes = () => {
    const token = localStorage.getItem('token');
    return(
        <PrivateRoute token={token}>
            <Outlet />
        </PrivateRoute>
    );
}

export default ProtectedRoutes;