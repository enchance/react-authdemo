import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useAuthStore} from "../store";


export const LogoutAction: React.FC = () => {
    const authstore = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        authstore.logout();
        navigate('/');
    }, []);

    return (
        <>
        </>
    );
}