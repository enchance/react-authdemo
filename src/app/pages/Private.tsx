import React from "react";
import {Helmet} from "react-helmet-async";
import S from "../settings";

import {BaseTemplate} from "../../templates/BaseTemplate";


export const PrivatePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Private Page | {S.SITENAME}</title>
            </Helmet>
            <BaseTemplate>
                <main>
                    <h1>Private page</h1>
                </main>
            </BaseTemplate>
        </>
    );
}