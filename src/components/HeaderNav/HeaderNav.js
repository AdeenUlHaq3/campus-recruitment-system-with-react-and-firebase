import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderNav.css';

export default () =>
    <header>
        <span></span>
        <div className='nav container'>
            <NavLink id='admin' className='btn fa fa-user-o' to='/'></NavLink>
            <NavLink id='student' className='btn fa fa-graduation-cap' to='/studentLogin'></NavLink>
            <NavLink id='company' className='btn fa fa-building-o' to='/companyLogin'></NavLink>
        </div>
    </header>