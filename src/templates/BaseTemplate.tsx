import React, {useEffect, PropsWithChildren} from "react";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css'

import S from "../app/settings";
import {BootstrapDisplay} from "../app/helpers";
import {useAuthStore} from "../app/auth/store";
import {WrapperTemplate} from "../app/wrappers";


export const BaseTemplate: React.FC<PropsWithChildren> = props => {
    return (
        <WrapperTemplate>
            <div className={'base-template'}>
                <Header />
                <div className="container">
                    {props.children}
                </div>
                <Footer />
            </div>
        </WrapperTemplate>
    )
}


type SidebarTemplateProps = {
    sidebar: React.ReactElement
} & PropsWithChildren

export const SidebarTemplate: React.FC<SidebarTemplateProps> = props => {
    return (
        <WrapperTemplate>
            <div className={'sidebar-template'}>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <aside className={'sidebar col-md-3 col-xl-2 bg-primary d-none d-md-block vh-100'}>
                            {props.sidebar}
                        </aside>
                        <div className="content col-12 col-md-9 col-xl-10 bg-secondary vh-100">
                            {props.children}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </WrapperTemplate>
    )
}


export const Header: React.FC = () => {
    const isAuth = useAuthStore(state => state.isAuth);

    return (
        <Navbar id={'navbar'} expand="lg" className="bg-body-tertiary">
            <Container>
                <Link to={'/'} className={'navbar-brand'}>React-Bootstrap</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={'/'} className={'nav-link'}>Home</NavLink>
                        {!isAuth() && (
                            <>
                                <NavLink to={S.paths.register} className={'nav-link'}>Register</NavLink>
                                <NavLink to={S.paths.signin} className={'nav-link'}>Sign-in</NavLink>
                                <NavLink to={S.paths.lostpass} className={'nav-link'}>Reset Password</NavLink>
                            </>
                        )}
                        {isAuth() && (
                            <>
                                <NavLink to={S.paths.signout} className={'nav-link'}>Sign-out</NavLink>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        <BootstrapDisplay />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export const Footer: React.FC = () => {
    return (
        <footer id={'footer'}>
            Footer here
        </footer>
    )
}