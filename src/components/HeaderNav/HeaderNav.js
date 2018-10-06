import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderNav.css';

export default () =>
    <header id='main-header'>
        <div className='nav container'>
            <NavLink id='admin' className='fa fa-user-o' to='/'></NavLink>
            <NavLink id='student' className='fa fa-graduation-cap' to='/studentLogin'></NavLink>
            <NavLink id='company' className='fa fa-building-o' to='/companyLogin'></NavLink>
        </div>
    </header>