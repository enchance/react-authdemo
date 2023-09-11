import React, {PropsWithChildren} from "react";
import {Helmet} from "react-helmet-async";

import {BaseTemplate} from "../../templates/BaseTemplate";
import S from "../settings";




type TErrorBoundaryState = {
    error: string | null,
}

export class ErrorBoundary extends React.Component<PropsWithChildren, TErrorBoundaryState> {
    state = {error: null};

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return {error: error.message.toString()};
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.log(info);
    }

    render() {
        if(this.state.error === null) return this.props.children;
        if(S.DEBUG) return <h1>{this.state.error}</h1>;

        return (
            <>
                <h1>This is an error</h1>
            </>
        )
    }
}


export const Error404Page: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Error 404 | {S.SITENAME}</title>
            </Helmet>
            <BaseTemplate>
                <h1>Error 404</h1>
            </BaseTemplate>
        </>
    )
}


export const Error500Page: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Error 500 | {S.SITENAME}</title>
            </Helmet>
            <BaseTemplate>
                <h1>Error 500</h1>
            </BaseTemplate>
        </>
    );
}