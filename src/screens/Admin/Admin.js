import React, { Component } from 'react';
import firebase from 'firebase';
import './Admin.css';
import swal from 'sweetalert';

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

    deleteStudent = (index, key) => {
        const {
            students
        } = this.state;

        swal({
            title: "Are you sure you you want to delete this Student?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    firebase.database().ref(`Users/${key}`)
                        .remove()
                        .then(() => {
                            students.splice(index, 1);
                            this.setState({ students });
                        })
                    swal('Success', 'Student Deleted');

                } else {
                    swal("Your record is safe!");
                }
            });
    }

    deleteCompany = (index, key) => {
        const {
            companies
        } = this.state;

        swal({
            title: "Are you sure you you want to delete this Company?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    firebase.database().ref(`Users/${key}`)
                        .remove()
                        .then(() => {
                            companies.splice(index, 1);
                            this.setState({ companies });
                        })
                    swal('Success', 'Company Deleted');

                } else {
                    swal("Your record is safe!");
                }
            });
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
            <div>
                <header>
                    <input className='btn' type='button' value='Logout' onClick={() => signOut()} />
                </header>
                <div className='container admin'>
                    <ul className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab" href="#student">Student</a></li>
                        <li><a data-toggle="tab" href="#company">Company</a></li>
                    </ul>

                    <div className="tab-content">
                        <div id="student" className="tab-pane fade in active">
                            {
                                students.map((student, index) =>
                                    <div key={student.key} className='student'>
                                        <h3>
                                            {student.val.firstName} {student.val.lastName}&nbsp;
                                            <button className='fa fa-trash' title='Delete' onClick={() => this.deleteStudent(index, student.key)}></button>
                                            <button className='fa fa-edit' title='Edit' onClick={() => this.redirectToEditStudentPage(student.key)}></button>&nbsp;
                                        </h3>
                                        <h4>{student.val.email} | {student.val.phone} | {student.val.city}</h4>
                                        <h4>Age: {student.val.age}</h4>
                                        <h4>School: {student.val.schoolName} | Grade: {student.val.schoolGrade}</h4>
                                        <h4>College: {student.val.collegeName} | Grade: {student.val.collegeGrade}</h4>
                                        <h4>University: {student.val.universityName} | GPA: {student.val.universityGrade}</h4>
                                       
                                    </div>
                                )
                            }
                        </div>
                        <div id="company" className="tab-pane fade">
                            {
                                companies.map((company, index) =>
                                    <div key={company.key} className='company'>
                                        <h3>
                                            {company.val.name}
                                            <button type='button' className='fa fa-trash' title='Delete' onClick={() => this.deleteCompany(index, company.key)}></button>
                                            <button className='fa fa-edit' title='Edit' onClick={() => this.redirectToEditCompanyPage(company.key)}></button>
                                            <button className='fa fa-graduation-cap' title='Vacancies' onClick={() => this.redirectToShowVacancyPage(company.key)}></button>
                                        </h3>
                                        <h4>{company.val.email}</h4>
                                        <h4>{company.val.phone}</h4>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;
