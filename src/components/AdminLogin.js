import React, { Component } from 'react';

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
            <form onSubmit={(e) => signIn(e, 'admin', email, password)}>
                <h1>AdminLogin</h1>
                <input name='email' className='form-control' type='email' onChange={ this.handleChange } required placeholder='Email' />
                <input name='password' className='form-control' type='password' onChange={ this.handleChange } required placeholder='Password' />
                <input className='btn btn-warning' type='submit' value='Log In' />
            </form>
        );
    }
}

export default AdminLogin;