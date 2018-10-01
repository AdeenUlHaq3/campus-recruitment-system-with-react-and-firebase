import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            students: [],
            companies: []
        }
    }

    componentWillMount() {
        const {
            students,
            companies
        } = this.state;

        const {
            hideNav
        } = this.props.Admin;

        hideNav();

        firebase.database().ref('Users')
            .orderByChild('type')
            .equalTo('student')
            .on('child_added', student => {
                students.push({ val: student.val(), key: student.key });
                this.setState({ students });
            })

        firebase.database().ref('Users')
            .orderByChild('type')
            .equalTo('company')
            .on('child_added', company => {
                companies.push({ val: company.val(), key: company.key });
                this.setState({
                    companies
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    redirectToShowVacancyPage = (key) => {
        this.props.history.push(`/showVacancies?key=${key}`);
    }

    redirectToEditStudentPage = (key) => {
        this.props.history.push(`/editStudent?key=${key}`);
    }

    redirectToEditCompanyPage = (key) => {
        this.props.history.push(`/editCompany?key=${key}`);
    }

    render() {
        const {
            students,
            companies,
        } = this.state;

        const {
            signOut
        } = this.props.Admin;

        return (
            <div className='container admin'>
                <input className='btn btn-success' type='button' value='Logout' onClick={() => signOut()} />
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#student">Student</a></li>
                    <li><a data-toggle="tab" href="#company">Company</a></li>
                </ul>

                <div className="tab-content">
                    <div id="student" className="tab-pane fade in active">
                        {
                            students.map((student, index) =>
                                <div key={student.key} className='studentInAdmin'>
                                    <h3>{student.val.firstName} {student.val.lastName}</h3>
                                    <h4>{student.val.email} | {student.val.phone} | {student.val.city}</h4>
                                    <h4>Age: {student.val.age}</h4>
                                    <h4>School: {student.val.schoolName} | Grade: {student.val.schoolGrade}</h4>
                                    <h4>College: {student.val.collegeName} | Grade: {student.val.collegeGrade}</h4>
                                    <h4>University: {student.val.universityName} | GPA: {student.val.universityGrade}</h4>
                                    <input className='btn btn-primary' type='button' onClick={() => this.redirectToEditStudentPage(student.key)} value='Edit' />
                                    <input className='btn btn-danger' type='button' onClick={() => this.deleteStudent(index, student.key)} value='Delete' />
                                </div>
                            )
                        }
                    </div>
                    <div id="company" className="tab-pane fade">
                        {
                            companies.map((company, index) =>
                                <div key={company.key} className='companyInAdmin'>
                                    <h3>{company.val.name}</h3>
                                    <h4>{company.val.email}</h4>
                                    <h4>{company.val.phone}</h4>
                                    <input className='btn btn-success' type='button' onClick={() => this.redirectToShowVacancyPage(company.key)} value='Vacancies' />
                                    <input className='btn btn-primary' type='button' onClick={() => this.redirectToEditCompanyPage(company.key)} value='Edit' />
                                    <input className='btn btn-danger' type='button' onClick={() => this.deleteCompany(index, company.key)} value='Delete' />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Admin);
