import React, {PropsWithChildren} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {Link, NavLink} from "react-router-dom";

import S from "../app/settings";


export const BaseTemplate: React.FC<PropsWithChildren> = props => {
    return (
        <div className={'base-template'}>
            <Header />
            <div className="container">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}


export const SidebarTemplate: React.FC<PropsWithChildren> = props => {
    return (
        <div className={'sidebar-template'}>
            <Header />
            <h1>Unfinished Sidebar Template</h1>
            <Footer />
        </div>
    )
}


export const Header: React.FC = () => {
    return (
        <Navbar id={'navbar'} expand="lg" className="bg-body-tertiary">
            <Container>
                <Link to={'/'} className="navbar-brand">React-Bootstrap</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={'/'} className={'nav-link'}>Home</NavLink>
                        <NavLink to={S.path.register} className={'nav-link'}>Register</NavLink>
                        <NavLink to={S.path.signin} className={'nav-link'}>Sign-in</NavLink>
                        <NavLink to={S.path.lostpass} className={'nav-link'}>Lost Password</NavLink>
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