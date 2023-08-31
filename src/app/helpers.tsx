import React, {} from "react";
import {Navigate, Outlet} from "react-router-dom";



type ProtectedRouteProps = {
    enable: () => boolean;
    fallback: React.ReactElement | string;
};

export const isAuth = () => {
    // TODO: Check store for auth
    return false;
}

export const isGuest = () => !isAuth();

export const ProtectedRoute = ({enable, fallback}: ProtectedRouteProps) => {
    if(enable()) return <Outlet />
    if(typeof fallback === 'string') return <Navigate to={fallback} />;
    return fallback;
};