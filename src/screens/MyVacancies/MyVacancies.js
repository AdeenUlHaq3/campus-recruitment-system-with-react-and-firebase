import React, { Component } from 'react';
import firebase from 'firebase';
import './MyVacancies.css';

class MyVacancies extends Component {
    constructor() {
        super();
        this.state = {
            myVacancies: []
        }
    }

    componentDidMount() {
        const {
            myVacancies
        } = this.state;

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.database().ref(`Users/${user.uid}/vacancies`)
                    .on('child_added', (snapshot) => {
                        myVacancies.push(snapshot.val());
                    })
                this.setState({
                    companyUId: user.uid,
                    myVacancies
                });
            }
        })
    }

    showAppliedStudents = (studentUIds) => {
        this.props.history.push({
            pathname: '/appliedStudents',
            studentUIds
        })
    }

    render() {
        const {
            myVacancies
        } = this.state;
        return (
            <div className='col-md-12 myVacancies' >
                <h1>My Vacancies</h1>
                {
                    myVacancies.map((vacancy, index) => {
                        return <div key={index} className='vacancy'>
                            <h3>{vacancy.name} | ({vacancy.companyName})</h3>
                            <h4>{vacancy.companyEmail} | {vacancy.companyNo}</h4>
                            <h4>Qualification: {vacancy.qualification}</h4>
                            <h4>Designation: {vacancy.designation}</h4>
                            <h4>Salary: {vacancy.salary}</h4>
                            <button onClick={ () => this.showAppliedStudents(vacancy.studentUIds) }>Applied Students</button>
                        </div>
                    })
                }
            </div >
        );
    }
}
export default MyVacancies;
