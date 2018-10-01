import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import swal from 'sweetalert';
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';

import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';
import StudentSignUp from './components/StudentSignUp';
import CompanyLogin from './components/CompanyLogin';
import ComapnySignUp from './components/CompanySignUp';
import Student from './screens/Student/Student';
import Company from './screens/Company/Company';
import Admin from './screens/Admin/Admin';
import MyVacancies from './screens/Company/MyVacancies';
import EditStudent from './screens/Admin/EditStudent';
import EditCompany from './screens/Admin/EditCompany';
import ShowVacancies from './screens/Admin/ShowVacancies';
import EditVacacny from './screens/Admin/EditVacancy';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isUser: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user)
        firebase.database().ref(`Users/${user.uid}`)
        .once('value', user => {
          this.props.history.push(`/${user.val().type}`)
        })
  })
}

  signIn = (e, type, email, password) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(snapshot => {
        firebase.database().ref(`Users/${snapshot.user.uid}`)
        .once('value', user => {
          const userObj = user.val();
          if(!userObj) {
            return firebase.auth().currentUser.delete()
            .then(() => {
              swal('Sorry', `This ${type} is deleted by admin`, 'error');
            })
          }
          
          if(userObj.type === type) {
            swal('Signed In', `Welcome ${type}`, 'success');
            this.props.history.push(`/${type}`);
          }
          else 
            swal('Warning', 'You are logging through wrong form', 'error');      
        })
      })
      .catch((error) => {
        if(error.code === 'auth/user-not-found')
          swal('Sorry', 'There is no user with these credentials', 'error');
        
      })
  }

  signOut = (type = '') => {
    firebase.auth().signOut()
    .then(() => {
      this.setState({
        isUser: false
      })
      this.props.history.push(`/${type}`);
    })
  }

  hideNav = () => {
    if(!this.state.isUser)
      this.setState({
        isUser: true
      })
  }

  render() {
    const {
      isUser
    } = this.state;

    return (
      <div className="App">
        <div className="container login">
          {
            !isUser
            &&
            <div className='nav'>
              <NavLink className='btn btn-warning active' to='/'>Admin</NavLink>
              <NavLink className='btn btn-warning' to='/studentLogin'>Student</NavLink>
              <NavLink className='btn btn-warning' to='/companyLogin'>Company</NavLink>  
            </div>
          }
          
          <Switch>
            <Route path='/' render={(props) => <AdminLogin {...props} AdminLogin={{ signIn: this.signIn }} />} exact />
            <Route path='/studentSignUp' component={ StudentSignUp } />
            <Route path='/studentLogin' render={(props) => <StudentLogin {...props} StudentLogin={{ signIn: this.signIn }} />} />
            <Route path='/companySignUp' component={ ComapnySignUp } />
            <Route path='/companyLogin' render={(props) => <CompanyLogin {...props} CompanyLogin={{ signIn: this.signIn }} />} />
            <Route path='/admin' render={(props) => <Admin {...props} Admin={{ hideNav: this.hideNav, signOut: this.signOut }} />} />
            <Route path='/student' render={(props) => <Student {...props} Student={{ hideNav: this.hideNav, signOut: this.signOut }} />} />
            <Route path='/company' render={(props) => <Company {...props} Company={{ hideNav: this.hideNav, signOut: this.signOut }} />} />
            <Route path='/myVacancies' component={ MyVacancies } />
            <Route path='/editStudent' component={ EditStudent } />} />
            <Route path='/editCompany' component={ EditCompany } />} />
            <Route path='/showVacancies' component={ ShowVacancies } />} />
            <Route path='/editVacancy' component={ EditVacacny } />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
