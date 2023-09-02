import React from "react";

import {BaseTemplate, SidebarTemplate} from "../templates/BaseTemplate";
import {AuthOptionsPart} from "../app/auth/pages/AuthOptionsPart";
import {SidebarPart} from "./SidebarPart";
import {useAuthStore} from "../app/auth/store";




export const IndexPage: React.FC = () => {
    const isAuth = useAuthStore(state => state.isAuth);

    return isAuth() ? <HomeUserPage /> : <HomeGuestPage />;
}

export const HomeGuestPage: React.FC = () => {
    return (
        <BaseTemplate>
            <AuthOptionsPart />
        </BaseTemplate>
    );
}


export const HomeUserPage: React.FC = () => {
    return (
        <BaseTemplate>
            <h1>User Landing</h1>
        </BaseTemplate>
    );
}