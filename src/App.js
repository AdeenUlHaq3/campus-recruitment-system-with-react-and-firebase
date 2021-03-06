import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import swal from 'sweetalert';
import { Route, Switch, withRouter } from 'react-router-dom';

import AdminLogin from './components/AdminLogin/AdminLogin';
import StudentLogin from './components/StudentLogin/StudentLogin';
import StudentSignUp from './components/StudentSignUp/StudentSignUp';
import CompanyLogin from './components/CompanyLogin/CompanyLogin';
import ComapnySignUp from './components/CompanySignUp/CompanySignUp';
import Student from './screens/Student/Student';
import Company from './screens/Company/Company';
import Admin from './screens/Admin/Admin';
import MyVacancies from './screens/MyVacancies/MyVacancies';
import EditStudent from './screens/EditStudent/EditStudent';
import EditCompany from './screens/EditCompany/EditCompany';
import ShowVacancies from './screens/ShowVacancies/ShowVacancies';
import EditVacacny from './screens/EditVacancy/EditVacancy';
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppliedStudents from './screens/AppliedStudents/AppliedStudents';

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
          this.props.history.push(`/${user.val().type}`);
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
            firebase.auth().currentUser.delete()
            .then(() => {
              swal('Sorry', `This ${type} is deleted by admin`, 'error');
            })
          }
          
          else if(userObj.type === type) {
            swal('Signed In', `Welcome ${type}`, 'success');
            this.props.history.push(`/${type}`);
          }
          
          else 
            swal('Warning', 'You are signing in through wrong form', 'error');      
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
      this.props.history.push(`/${type}`);
      this.setState({
        isUser: false
      })
    })
  }

  hideNav = () => {
    this.setState({
      isUser: true
    })
  }

  render() {
    const {
      isUser
    } = this.state;
    
    return (
      <div>
        <div className="login">
          {
            !isUser
            &&
            <HeaderNav />
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
            <Route path='/appliedStudents' component={ AppliedStudents } />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
