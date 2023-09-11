import React, {PropsWithChildren, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import Auth from "../app/auth/Auth";
import {useAuthStore} from "../app/auth/store";



export const WrapperTemplate: React.FC<PropsWithChildren> = props => {
    const authstore =  useAuthStore();
    const location = useLocation();
    const navigate = useNavigate()

    // When location changes
    useEffect(() => {
        if(authstore.token && Auth.isTokenExpired(authstore.token)) {
            authstore.logout();
            navigate('/');
        }
        window.scrollTo({top: 0});
    }, [location]);

    return props.children;
}