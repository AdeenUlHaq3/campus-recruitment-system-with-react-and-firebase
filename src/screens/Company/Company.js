import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import './Company.css';

class Company extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            companyName: '',
            companyEmail: '',
            companyNo: '',
            qualification: '',
            designation: '',
            salary: '',
            myVacancies: [],
            myVacancyPage: false,
            students: []
        }
    }

    componentWillMount() {
        const {
            students
        } = this.state;

        const {
            hideNav
        } = this.props.Company;

        hideNav();

        firebase.auth().onAuthStateChanged(user => {
            if (user)
                this.setState({ companyUId: user.uid });
        })

        firebase.database().ref('Users')
            .orderByChild('type')
            .equalTo('student')
            .on('child_added', student => {
                students.push(student.val());
                this.setState({ students });
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    postVacany = (e) => {
        e.preventDefault();

        const {
            companyUId,
            name,
            companyName,
            companyEmail,
            companyNo,
            qualification,
            designation,
            salary
        } = this.state;

        firebase.database().ref(`Users/${companyUId}/vacancies`)
            .push({
                name,
                companyName,
                companyEmail,
                companyNo,
                qualification,
                designation,
                salary
            })
            .then(() => swal('Good Job!', 'Vacancy Posted Successfully', 'success'));

        this.setState({
            name: '',
            companyName: '',
            companyEmail: '',
            companyNo: '',
            qualification: '',
            designation: '',
            salary: '',
            myVacancyPage: false
        })
    }

    render() {
        const {
            name,
            companyName,
            companyEmail,
            companyNo,
            qualification,
            designation,
            salary,
            students
        } = this.state;

        const {
            signOut
        } = this.props.Company;

        return (
            <div>
                <header id='company-header'>
                    <input className='btn' type='button' value='Logout' onClick={() => signOut('companyLogin')} />
                </header>
                <div className="container company" >
                    <div>
                        <ul className="nav nav-tabs">
                            <li className="active"><a data-toggle="tab" href="#vacancy">Vacancy</a></li>
                            <li><a data-toggle="tab" href="#students">Students</a></li>
                        </ul>

                        <div className="tab-content">
                            <div id="vacancy" className="tab-pane fade in active">
                                <form onSubmit={this.postVacany}>
                                    <input name='name' className='form-control' value={name} onChange={this.handleChange} required placeholder='Vacancy' />
                                    <input name='companyName' className='form-control' value={companyName} onChange={this.handleChange} required placeholder='Company Name' />
                                    <input type='email' name='companyEmail' className='form-control' value={companyEmail} onChange={this.handleChange} required placeholder='Company Email' />
                                    <input type='phone' name='companyNo' className='form-control' value={companyNo} onChange={this.handleChange} required placeholder='Company No.' />
                                    <input name='qualification' className='form-control' value={qualification} onChange={this.handleChange} required placeholder='Qualification' />
                                    <input name='designation' className='form-control' value={designation} onChange={this.handleChange} required placeholder='Designation' />
                                    <input type='number' name='salary' className='form-control' value={salary} onChange={this.handleChange} required placeholder='Salary' />
                                    <input className='btn' type='submit' value='Post Vacancy' />
                                    <NavLink className='btn' to='/myVacancies'>My Vacancies</NavLink>
                                </form>
                            </div>
                            <div id="students" className="tab-pane fade">
                                {
                                    students.map((student, index) =>
                                        <div key={index} className='std'>
                                            <h3>{student.firstName} {student.lastName}</h3>
                                            <h4>{student.email} | {student.phone} | {student.city}</h4>
                                            <h4>Age: {student.age}</h4>
                                            <h4>School: {student.schoolName} | Grade: {student.schoolGrade}</h4>
                                            <h4>College: {student.collegeName} | Grade: {student.collegeGrade}</h4>
                                            <h4>University: {student.universityName} | GPA: {student.universityGrade}</h4>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        );
    }
}

export default Company;
