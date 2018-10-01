import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';

class StudentSignUp extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signUp = (e, type, firstName, lastName, email, password) => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(student => {
            firebase.database().ref(`Users/${student.user.uid}`).set({
              firstName,
              lastName,
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
            firstName,
            lastName,
            email,
            password
        } = this.state;

        return (
            <form onSubmit={ (e) => this.signUp(e, 'student', firstName, lastName, email, password) }>
                <h1>StudentSignUp</h1>
                <input name='firstName' required className='form-control' value={ firstName } onChange={ this.handleChange } placeholder='First Name' />
                <input name='lastName' required className='form-control' value={ lastName } onChange={ this.handleChange } placeholder='Last Name' />
                <input name='email' required className='form-control' value={ email } onChange={ this.handleChange } type='email' placeholder='Email' />
                <input name='password' required className='form-control' value={ password } onChange={ this.handleChange } type='password' placeholder='Password' />
                <input className='btn btn-warning' type='submit' value='Sign Up' />
                <span>Already have an account? <NavLink to='/studentLogin'>Log In</NavLink></span>
            </form>
        );
    }
}

export default StudentSignUp;