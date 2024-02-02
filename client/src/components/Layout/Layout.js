import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';
import './styles.css';


const Layout = () => {
    const [ user, setUser ] = useState(
        JSON.parse(localStorage.getItem('profile'))
    );
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        navigate('/auth');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <div className='layout-container'>
            <nav className="navBar">
                <div className="navBar-title">
                    <a href="/">
                        <h2>The <span><b>Cocktails</b></span>DB</h2>
                    </a>
                </div>
                
                <ul >
                    <li className='navBar-list'>
                        {user ? (
                            <div className="profile">
                                <div className='profile-image'>
                                    <img 
                                        src={user.result.image} 
                                        alt={user.result.name} 
                                        width="50px" 
                                        height="50px" 
                                    />
                                </div>

                                <p className="profile-name">
                                    {user.result.name}
                                </p>

                                <button 
                                    className='profile-logout-button' 
                                    onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className='profile'>
                                <a 
                                    href="/auth" 
                                    className='profile-login-button'>
                                    Login
                                </a>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>           
            
            <Outlet />
        </div>
    );
};

export default Layout;