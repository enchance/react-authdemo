import React, {PropsWithChildren} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {NavLink} from "react-router-dom";


export const BaseTemplate: React.FC<PropsWithChildren> = props => {
    return (
        <div className={'basetemplate'}>
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}


export const SidebarTemplate: React.FC<PropsWithChildren> = props => {
    return (
        <div className={'sidebar-template'}>
            <h1>Unfinished Sidebar Template</h1>
        </div>
    )
}


export const Header: React.FC = () => {
    return (
        <Navbar id={'navbar'} expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={'/'} className={'nav-link'}>Home</NavLink>
                        <NavLink to={'/home'} className={'nav-link'}>Info</NavLink>
                        <NavLink to={'/edit'} className={'nav-link'}>Edit</NavLink>
                        <NavLink to={'/protected'} className={'nav-link'}>Protected</NavLink>
                        <NavLink to={'/xxx'} className={'nav-link'}>Error 404</NavLink>
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