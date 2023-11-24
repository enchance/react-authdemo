import React from "react";
import {Navigate, Outlet} from "react-router-dom";



const login = () => {}

const logout = () => {}


type ProtectedRouteProps = {
    enable: () => boolean;
    fallback: React.ReactElement | string;
};

export const ProtectedRoute = ({enable, fallback}: ProtectedRouteProps) => {
    if(enable()) return <Outlet />
    if(typeof fallback === 'string') return <Navigate to={fallback} />;
    return fallback;
};

export const BootstrapDisplay: React.FC = () => {
    return (
        <>
            <span className={'nav-link d-block d-sm-none'}>XS</span>
            <span className={'nav-link d-none d-sm-block d-md-none'}>SM</span>
            <span className={'nav-link d-none d-md-block d-lg-none'}>MD</span>
            <span className={'nav-link d-none d-lg-block d-xl-none'}>LG</span>
            <span className={'nav-link d-none d-xl-block d-xxl-none'}>XL</span>
            <span className={'nav-link d-none d-xxl-block'}>XXL</span>
        </>
    )
}


type IconProps = {
    icon: string,
    style?: object,
    size?: string,
    color?: string,
}

/*
* Bootstrap icons
* https://icons.getbootstrap.com/
* */
export const Icons: React.FC<IconProps> = props => {
    const style = {
        display: 'inline-block',
        fontSize: props.size ?? '20px',
        color: props.color ?? '#3333',
        ...(props.style ?? {}),
    }
    return <i className={props.icon} style={style}></i>;
}