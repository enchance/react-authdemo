import React from "react";
import {BaseTemplate} from "../templates/BaseTemplate";
import {AuthOptionsComp} from "../app/auth/pages/AuthOptionsComp";


export const HomeGuestPage: React.FC = () => {
    return (
        <BaseTemplate>
            <AuthOptionsComp />
        </BaseTemplate>
    )
}


export const HomeUserPage: React.FC = () => {
    return (
        <BaseTemplate>
            <h1>User Landing</h1>
        </BaseTemplate>
    )
}