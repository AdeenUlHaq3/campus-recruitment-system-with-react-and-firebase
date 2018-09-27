import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';

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
            myVacancies,
            students
        } = this.state;

        const {
            emailLoginCompany,
            passwordLoginCompany
        } = this.props.Company;

        firebase.auth().signInWithEmailAndPassword(emailLoginCompany, passwordLoginCompany)
            .then(company => {
                swal('Signed In', 'Welcome Company', 'success');
                firebase.database().ref(`companies/${company.user.uid}/vacancies`)
                    .on('child_added', (snapshot) => {
                        myVacancies.push(snapshot.val());
                    })
            })

        firebase.database().ref('students')
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

        firebase.database().ref(`companies/${companyUId}/vacancies`)
            .push({
                name,
                companyName,
                companyEmail,
                companyNo,
                qualification,
                designation,
                salary
            })
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
            myVacancyPage,
            myVacancies,
            students
        } = this.state;

        const { logOut } = this.props.Company;

        return (
            <div className="container company">
                <input className='btn btn-success' type='button' value='Logout' onClick={logOut} />
                {
                    myVacancyPage
                    ?
                    <div className='myVacancies'>
                        <h1>My Vacancies</h1>
                        {
                            myVacancies.map((vacancy, index) => {
                                return <div key={index} className='vacancy'>
                                    <h4>Vacany: <i>{vacancy.name}</i></h4>
                                    <h4>Company: <i>{vacancy.companyName}</i></h4>
                                    <h4>Email: <i>{vacancy.companyEmail}</i></h4>
                                    <h4>Contact No: <i>{vacancy.companyNo}</i></h4>
                                    <h4>Qualification: <i>{vacancy.qualification}</i></h4>
                                    <h4>Designation: <i>{vacancy.designation}</i></h4>
                                    <h4>Salary: <i>{vacancy.salary}</i></h4>
                                </div>
                            })
                        }
                        <input className='btn btn-success' type='button' onClick={() => this.setState({ myVacancyPage: false })} value='Back' />
                    </div>
                    :
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
                                    <input className='btn btn-warning' type='submit' value='Post Vacancy' />
                                    <input className='btn btn-success' onClick={() => this.setState({ myVacancyPage: true })} type='button' value='My Vacancies' />
                                </form>
                            </div>
                            <div id="students" className="tab-pane fade">
                                {
                                    students.map((student, index) => {
                                        return <div onClick={ this.student } key={index} className='std'>
                                            <h4>Name: <i>{student.firstName} {student.lastName}</i></h4>
                                            <h4>University: <i>{student.universityName}</i></h4>
                                            <h4>GPA: <i>{student.universityGrade}</i></h4>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Company;