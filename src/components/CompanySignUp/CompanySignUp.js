import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import './CompanySignUp.css';

class CompanySignUp extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            phone: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signUp = (e, type, name, phone, email, password) => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(company => {
                firebase.database().ref(`Users/${company.user.uid}`).set({
                    name,
                    phone,
                    email,
                    password,
                    type
                })
                .then(() => {
                    swal("Good job!", `You are registered as a ${type}!`, "success");
                })
            })
    }

    render() {
        const {
            name,
            phone,
            email,
            password
        } = this.state;

        return (
            <form id='company-signup' onSubmit={(e) => this.signUp(e, 'company', name, phone, email, password)}>
                <h1>CompanySignUp</h1>
                <input name='name' required className='form-control' value={ name } onChange={ this.handleChange } placeholder='Company N@me' />
                <input name='phone' required className='form-control' value={ phone } onChange={ this.handleChange } type='phone' placeholder='P&#9743;one' />
                <input name='email' required className='form-control' value={ email } onChange={ this.handleChange } type='email' placeholder='E&#9993;ail' />
                <input name='password' required className='form-control' value={ password } onChange={ this.handleChange } type='password' placeholder='P@ssword' />
                <button className='btn fa fa-user-plus' type='submit'></button>
                <span>Already have an account? <NavLink style={{ color: 'rgba(0 ,0 ,0 , .6)' }} to='/companyLogin'>Log In</NavLink></span>
            </form>
        );
    }
}

export default CompanySignUp;