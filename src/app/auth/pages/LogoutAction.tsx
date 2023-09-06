import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {signOut} from 'firebase/auth';

import {appAuth} from "../../../AppRoutes";
import {useAuthStore} from "../store";


export const LogoutAction: React.FC = () => {
    const authstore = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        signOut(appAuth)
            .then(() => {
                authstore.logout();
                navigate('/');
            })
            .catch(err => {
                navigate('/');
            })
    }, []);

    return <></>;
}