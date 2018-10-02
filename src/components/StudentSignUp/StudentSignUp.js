import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import './StudentSignUp.css';

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
            <form id='student-signup' onSubmit={ (e) => this.signUp(e, 'student', firstName, lastName, email, password) }>
                <h1>StudentSignUp</h1>
                <input name='firstName' required className='form-control' value={ firstName } onChange={ this.handleChange } placeholder='First N@me' />
                <input name='lastName' required className='form-control' value={ lastName } onChange={ this.handleChange } placeholder='Last N@me' />
                <input name='email' required className='form-control' value={ email } onChange={ this.handleChange } type='email' placeholder='E&#9993;ail' />
                <input name='password' required className='form-control' value={ password } onChange={ this.handleChange } type='password' placeholder='P@ssword' />
                <button className='btn fa fa-user-plus' type='submit'></button>
                <span>Already have an account? <NavLink style={{ color: 'rgba(0 ,0 ,0 , .6)' }} to='/studentLogin'>Log In</NavLink></span>
            </form>
        );
    }
}

export default StudentSignUp;