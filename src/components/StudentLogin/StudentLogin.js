import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './StudentLogin.css';

class StudentLogin extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {
            email,
            password
        } = this.state;

        const { 
            signIn 
        } = this.props.StudentLogin;

        return (
            <form id='student-login' onSubmit={ (e) => signIn(e, 'student', email, password) }>
                <h1>StudentLogin</h1>
                <input name='email' className='form-control' type='email' onChange={ this.handleChange } placeholder='E&#9993;ail' />
                <input name='password' className='form-control' type='password' onChange={ this.handleChange } placeholder='P@ssword' />
                <button className='btn fa fa-sign-in' type='submit'></button>
                <span>Don't have an account? <NavLink style={{ color: 'rgba(0 ,0 ,0 , .6)' }} to='/studentSignUp'>Sign Up</NavLink></span>
            </form>
        );
    }
}

export default StudentLogin;