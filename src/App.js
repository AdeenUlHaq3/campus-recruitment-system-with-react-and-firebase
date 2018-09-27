import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import swal from 'sweetalert';

import Student from './screens/Student/Student';
import Company from './screens/Company/Company';
import Admin from './screens/Admin/Admin';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isStudentSignedIn: false,
      isCompanySignedIn: false,
      isAdminSignedIn: false,
      isStudentSignInPage: true,
      isCompanySignInPage: true,
      firstNameSignUpStudent: '',
      lastNameSignUpStudent: '',
      emailSignUpStudent: '',
      passwordSignUpStudent: '',
      emailLoginStudent: '',
      passwordLoginStudent: '',
      nameSignUpCompany: '',
      emailSignUpCompany: '',
      passwordSignUpCompany: '',
      emailLoginCompany: '',
      passwordLoginCompany: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  studentSignUp = (e) => {
    e.preventDefault();
    const { firstNameSignUpStudent, lastNameSignUpStudent, emailSignUpStudent, passwordSignUpStudent } = this.state;
    firebase.auth().createUserWithEmailAndPassword(emailSignUpStudent, passwordSignUpStudent)
      .then(student => {
        firebase.database().ref(`students/${student.user.uid}`).set({
          firstName: firstNameSignUpStudent,
          lastName: lastNameSignUpStudent,
          email: emailSignUpStudent,
          password: passwordSignUpStudent
        })
          .then(() => {
            swal("Good job!", "You are registered as an student!", "success");
            this.setState({
              firstNameSignUpStudent: '',
              lastNameSignUpStudent: '',
              emailSignUpStudent: '',
              passwordSignUpStudent: ''
            })
          })
      })
  }

  studentLogin = (e) => {
    e.preventDefault();
    const { emailLoginStudent, passwordLoginStudent } = this.state;
    firebase.database()
      .ref(`students`)
      .orderByChild('email')
      .equalTo(emailLoginStudent)
      .once('value', snapshot => {
        if (snapshot.val()) {
          snapshot.forEach(student => {
            if (student.val().password === passwordLoginStudent){
              this.setState({ isStudentSignedIn: true });
            }
            else
              swal('Error', 'Wrong Username or Password', 'error');
          })
        }
        else
          swal('Error', 'Wrong Username or Password', 'error');
      })
  }

  studentLogOut = () => {
    firebase.auth().signOut()
    .then(() => {
      this.setState({
        isStudentSignedIn: false
      })
    })
  }

  companySignUp = (e) => {
    e.preventDefault();
    const { nameSignUpCompany, emailSignUpCompany, passwordSignUpCompany } = this.state;
    firebase.auth().createUserWithEmailAndPassword(emailSignUpCompany, passwordSignUpCompany)
      .then(company => {
        firebase.database().ref(`companies/${company.user.uid}`).set({
          name: nameSignUpCompany,
          email: emailSignUpCompany,
          password: passwordSignUpCompany
        })
          .then(() => {
            swal("Good job!", "You are registered as a company!", "success");
            this.setState({
              nameSignUpCompany: '',
              emailSignUpCompany: '',
              passwordSignUpCompany: ''
            })
          })
      })
  }

  companyLogin = (e) => {
    e.preventDefault();
    const { emailLoginCompany, passwordLoginCompany } = this.state;
    firebase.database()
      .ref(`companies`)
      .orderByChild('email')
      .equalTo(emailLoginCompany)
      .once('value', (snapshot) => {
        if (snapshot.val()) {
          snapshot.forEach(company => {
            if (company.val().password === passwordLoginCompany) {
              this.setState({ isCompanySignedIn: true });
            }
            else
              swal('Error', 'Wrong Username or Password', 'error');
          })
        }
        else
          swal('Error', 'Wrong Username or Password', 'error');
      })
  }

  companyLogOut = () => {
    firebase.auth().signOut()
    .then(() => {
      this.setState({
        isCompanySignedIn: false
      })
    })
  }

  render() {
    const {
      isAdminSignedIn,
      isCompanySignedIn,
      isStudentSignedIn,
      isStudentSignInPage,
      isCompanySignInPage,
      firstNameSignUpStudent,
      lastNameSignUpStudent,
      emailSignUpStudent,
      passwordSignUpStudent,
      emailLoginStudent,
      passwordLoginStudent,
      nameSignUpCompany,
      emailSignUpCompany,
      passwordSignUpCompany,
      emailLoginCompany,
      passwordLoginCompany
    } = this.state;

    return (
      <div className="App">
      {
        isStudentSignedIn
        ?
          <Student Student={{ logOut:this.studentLogOut, isStudentSignedIn, emailLoginStudent, passwordLoginStudent }} />
        :
        isCompanySignedIn
        ?
          <Company Company={{ logOut:this.companyLogOut, emailLoginCompany, passwordLoginCompany }} />
        :
        isAdminSignedIn
        ?
          <Admin />
        :
        <div className="container login">
          <ul className="nav nav-tabs">
            <li className="active"><a data-toggle="tab" href="#admin">Admin</a></li>
            <li><a data-toggle="tab" href="#student">Student</a></li>
            <li><a data-toggle="tab" href="#company">Company</a></li>
          </ul>

          <div className="tab-content">
            <div id="admin" className="tab-pane fade in active">
              <div>
                <form>
                  <h1>Login</h1>
                  <input name='emailAdmin' className='form-control' type='email' onChange={this.handleChange} placeholder='Email' />
                  <input name='passwordAdmin' className='form-control' type='password' onChange={this.handleChange} placeholder='Password' />
                  <button className='btn btn-warning' type='submit'>Log In</button>
                </form>
              </div>
            </div>
            <div id="student" className="tab-pane fade">
              {
                isStudentSignInPage
                  ?
                  <div>
                    <form onSubmit={this.studentLogin}>
                      <h1>Login</h1>
                      <input name='emailLoginStudent' className='form-control' type='email' onChange={this.handleChange} placeholder='Email' />
                      <input name='passwordLoginStudent' className='form-control' type='password' onChange={this.handleChange} placeholder='Password' />
                      <button className='btn btn-warning' type='submit'>Log In</button>
                      <span>Don't have an account? <a onClick={() => this.setState({ isStudentSignInPage: false })}>Sign Up</a></span>
                    </form>
                  </div>
                  :
                  <div>
                    <form onSubmit={this.studentSignUp}>
                      <h1>Sign Up</h1>
                      <input name='firstNameSignUpStudent' required value={firstNameSignUpStudent} className='form-control' onChange={this.handleChange} placeholder='First Name' />
                      <input name='lastNameSignUpStudent' required value={lastNameSignUpStudent} className='form-control' onChange={this.handleChange} placeholder='Last Name' />
                      <input name='emailSignUpStudent' required value={emailSignUpStudent} className='form-control' onChange={this.handleChange} type='email' placeholder='Email' />
                      <input name='passwordSignUpStudent' required value={passwordSignUpStudent} className='form-control' onChange={this.handleChange} type='password' placeholder='Password' />
                      <input className='btn btn-warning' type='submit' value='Sign Up' />
                      <span>Already have an account? <a onClick={() => this.setState({ isStudentSignInPage: true })}>Log In</a></span>
                    </form>
                  </div>
              }
            </div>
            <div id="company" className="tab-pane fade">
              {
                isCompanySignInPage
                  ?
                  <div>
                    <form onSubmit={this.companyLogin}>
                      <h1>Login</h1>
                      <input name='emailLoginCompany' className='form-control' type='email' onChange={this.handleChange} placeholder='Email' />
                      <input name='passwordLoginCompany' className='form-control' type='password' onChange={this.handleChange} placeholder='Password' />
                      <input className='btn btn-warning' value='Log In' type='submit' />
                      <span>Don't have an account? <a onClick={() => this.setState({ isCompanySignInPage: false })}>Sign Up</a></span>
                    </form>
                  </div>
                  :
                  <div>
                    <form onSubmit={this.companySignUp}>
                      <h1>Sign Up</h1>
                      <input name='nameSignUpCompany' required value={nameSignUpCompany} className='form-control' onChange={this.handleChange} placeholder='Company Name' />
                      <input name='emailSignUpCompany' required value={emailSignUpCompany} className='form-control' onChange={this.handleChange} type='email' placeholder='Email' />
                      <input name='passwordSignUpCompany' required value={passwordSignUpCompany} className='form-control' onChange={this.handleChange} type='password' placeholder='Password' />
                      <input className='btn btn-warning' type='submit' value='Sign Up' />
                      <span>Already have an account? <a onClick={() => this.setState({ isCompanySignInPage: true })}>Log In</a></span>
                    </form>
                  </div>
              }
            </div>
          </div>
        </div>
      }
      </div>
    );
  }
}

export default App;
