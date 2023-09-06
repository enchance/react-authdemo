import React, {PropsWithChildren, useEffect} from "react";
import {useAuthStore} from "./auth/store";
import {useLocation, useNavigate} from "react-router-dom";
import Auth from "./auth/Auth";



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