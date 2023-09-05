import React from "react";
import {onAuthStateChanged} from 'firebase/auth';

import {BaseTemplate, SidebarTemplate} from "../templates/BaseTemplate";
import {AuthOptionsPage} from "../app/auth/pages/AuthOptionsPage";
import {SidebarPart} from "./SidebarPart";
import {useAuthStore} from "../app/auth/store";




export const IndexPage: React.FC = () => {
    const isAuth = useAuthStore(state => state.isAuth);

    return isAuth() ? <HomeUserPage /> : <AuthOptionsPage />;
}


export const HomeUserPage: React.FC = () => {
    const token = useAuthStore(state => state.token);

    return (
        <BaseTemplate>
            <h1>User Landing</h1>
        </BaseTemplate>
    );
}