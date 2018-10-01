import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class CompanyLogin extends Component {
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
        } = this.props.CompanyLogin;

        return (
            <form onSubmit={(e) => signIn(e, 'company', email, password)}>
                <h1>CompanyLogin</h1>
                <input name='email' className='form-control' type='email' onChange={ this.handleChange } placeholder='Email' />
                <input name='password' className='form-control' type='password' onChange={ this.handleChange } placeholder='Password' />
                <input className='btn btn-warning' value='Log In' type='submit' />
                <span>Don't have an account? <NavLink to='/companySignUp'>Sign Up</NavLink></span>
            </form>
        );
    }
}

export default CompanyLogin;