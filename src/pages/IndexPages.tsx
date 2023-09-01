import React from "react";
import {BaseTemplate, SidebarTemplate} from "../templates/BaseTemplate";
import {AuthOptionsComp} from "../app/auth/pages/AuthOptionsComp";
import {SidebarPart} from "./SidebarPart";


export const HomeGuestPage: React.FC = () => {
    return (
        <SidebarTemplate sidebar={<SidebarPart />}>
            <AuthOptionsComp />
        </SidebarTemplate>
    )
}


export const HomeUserPage: React.FC = () => {
    return (
        <BaseTemplate>
            <h1>User Landing</h1>
        </BaseTemplate>
    )
}