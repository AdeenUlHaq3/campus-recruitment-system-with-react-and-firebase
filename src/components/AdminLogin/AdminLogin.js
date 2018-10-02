import React, { Component } from 'react';
import './AdminLogin.css';

class AdminLogin extends Component {
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
        } = this.props.AdminLogin;

        return (
            <form id='admin-login' onSubmit={(e) => signIn(e, 'admin', email, password)}>
                <h1>AdminLogin</h1>
                <input name='email' className='form-control' type='email' onChange={ this.handleChange } required placeholder='E&#9993;ail' />
                <input name='password' className='form-control' type='password' onChange={ this.handleChange } required placeholder='P@ssword' />
                <button className='btn fa fa-sign-in' type='submit'></button>
            </form>
        );
    }
}

export default AdminLogin;