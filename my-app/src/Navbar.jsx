import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react'
import {AuthContext} from "./context/auth";
import { ToastContainer, toast } from 'react-toastify';

const Navbar =() => {

    const auth = useContext(AuthContext)

    return (
        <>
        <div className="nav_bg">
            <div className="row">
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand"  to="/">
                              <h1 className="brand"> MediCard </h1>
                            </NavLink>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto mb-2 mb-lg-0"  >
                                    <li className="nav-item">
                                        <NavLink style={{color:'white'}} activeClassName='menu_active' exact className="nav-link active" aria-current="page" to="/">Home</NavLink>
                                    </li>
                                    {auth.isLoggedIn && (
                                    <li className="nav-item">
                                        <NavLink style={{color:'white'}} activeClassName='menu_active' className="nav-link" to="/dash">Dashboard</NavLink>
                                    </li>)}
                                    {!auth.isLoggedIn && (
                                    <li className="nav-item">
                                        <NavLink style={{color:'white'}} activeClassName='menu_active' className="nav-link" to="/data">Data</NavLink>
                                    </li>)}
                                    {auth.isLoggedIn && (
                                    <li className="nav-item">
                                        <NavLink style={{color:'white'}} activeClassName='menu_active' className="nav-link" to="/uploadDoc">Upload</NavLink>
                                    </li>)}
                                    {auth.isLoggedIn && (
                                    <li className="nav-item">
                                        <NavLink style={{color:'white'}} activeClassName='menu_active' className="nav-link" to="/search">Search</NavLink>
                                    </li>)}
                                    {auth.isLoggedIn && (
                                    <li className="nav-item">
                                        <NavLink style={{color:'white'}} activeClassName='menu_active' className="nav-link" to="/breathe">Breathe</NavLink>
                                    </li>)}
                                    {auth.isLoggedIn && (
                                    <li className="nav-item">
                                        <a style={{color:'white'}} activeClassName='menu_active' className="nav-link" href="https://radiant-depths-15453.herokuapp.com/">Chat</a>
                                    </li>)}
                                    {auth.isLoggedIn && (
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-danger" onClick={()=>{auth.logout()}}>Logout</button>
                                    </li>)}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
    );
};

export default Navbar;
