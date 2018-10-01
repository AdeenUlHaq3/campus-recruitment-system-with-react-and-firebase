import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
            <form onSubmit={ (e) => signIn(e, 'student', email, password) }>
                <h1>StudentLogin</h1>
                <input name='email' className='form-control' type='email' onChange={ this.handleChange } placeholder='Email' />
                <input name='password' className='form-control' type='password' onChange={ this.handleChange } placeholder='Password' />
                <button className='btn btn-warning' type='submit'>Log In</button>
                <span>Don't have an account? <NavLink to='/studentSignUp'>Sign Up</NavLink></span>
            </form>
        );
    }
}

export default StudentLogin;