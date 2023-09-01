import React, {PropsWithChildren} from "react";
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
// import {Nav, Navbar, NavDropdown, Container} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css'

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


type SidebarTemplateProps = {
    sidebar: React.ReactElement
} & PropsWithChildren

export const SidebarTemplate: React.FC<SidebarTemplateProps> = props => {
    return (
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
    )
}


export const Header: React.FC = () => {
    return (
        <Navbar id={'navbar'} expand="lg" className="bg-body-tertiary">
            <Container>
                <Link to={'/'} className={'navbar-brand'}>React-Bootstrap</Link>
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