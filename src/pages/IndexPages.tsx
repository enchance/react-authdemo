import React from "react";
import {BaseTemplate, SidebarTemplate} from "../templates/BaseTemplate";
import {AuthOptionsPart} from "../app/auth/pages/AuthOptionsPart";
import {SidebarPart} from "./SidebarPart";


export const HomeGuestPage: React.FC = () => {
    return (
        <SidebarTemplate sidebar={<SidebarPart />}>
            <AuthOptionsPart />
        </SidebarTemplate>
    );
}


export const HomeUserPage: React.FC = () => {
    return (
        <BaseTemplate>
            <h1>User Landing</h1>
        </BaseTemplate>
    );
}