import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';

class Student extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            city: '',
            age: '',
            schoolName: '',
            schoolGrade: '',
            collegeName: '',
            collegeGrade: '',
            universityName: '',
            universityGrade: '',
            vacancies: []
        }
    }

    componentDidMount() {
        const { vacancies } = this.state;

        const {
            emailLoginStudent,
            passwordLoginStudent
        } = this.props.Student;

        firebase.auth().signInWithEmailAndPassword(emailLoginStudent, passwordLoginStudent)
        .then(() => {
            swal('Signed In', 'Welcome Student', 'success');
            firebase.auth().onAuthStateChanged(user => {
                firebase.database().ref(`students/${user.uid}`)
                    .once('value', student => {
                        var studentObj = student.val();
                        this.setState({
                            firstName: studentObj.firstName,
                            lastName: studentObj.lastName,
                            email: studentObj.email,
                            password: studentObj.password,
                            phone: studentObj.phone,
                            city: studentObj.city,
                            age: studentObj.age,
                            schoolName: studentObj.schoolName,
                            schoolGrade: studentObj.schoolGrade,
                            collegeName: studentObj.collegeName,
                            collegeGrade: studentObj.collegeGrade,
                            universityName: studentObj.universityName,
                            universityGrade: studentObj.universityGrade,
                            studentUId: user.uid
                        })
                    })
            })
            firebase.database().ref('companies')
            .on('child_added', (snapshot) => {
                firebase.database().ref(`companies/${snapshot.key}/vacancies`)
                .on('child_added', vacancy => {
                    vacancies.push(vacancy.val());
                })
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateStudentDetails = (e) => {
        e.preventDefault();
        const {
            studentUId,
            firstName,
            lastName,
            email,
            password,
            phone,
            city,
            age,
            schoolName,
            schoolGrade,
            collegeName,
            collegeGrade,
            universityName,
            universityGrade
        } = this.state;

        firebase.database().ref(`students/${studentUId}`)
            .update({
                firstName,
                lastName,
                email,
                password,
                phone,
                city,
                age,
                schoolName,
                schoolGrade,
                collegeName,
                collegeGrade,
                universityName,
                universityGrade
            })
            .then(() => {
                swal('Success', 'Student Details Updated', 'success');
            })
    }

    render() {
        const {
            vacancies,
            firstName,
            lastName,
            email,
            password,
            phone,
            city,
            age,
            schoolName,
            schoolGrade,
            collegeName,
            collegeGrade,
            universityName,
            universityGrade
        } = this.state;

        const { logOut } = this.props.Student;

        return (
            <div className='container student'>
                <input className='btn btn-success' type='button' value='Logout' onClick={logOut} />
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#details">Details</a></li>
                    <li><a data-toggle="tab" href="#vacancies">Vacancies</a></li>
                </ul>

                <div className="tab-content">
                    <div id="details" className="tab-pane fade in active">
                        <form onSubmit={this.updateStudentDetails}>
                            <input name='firstName' className='form-control' value={firstName} onChange={this.handleChange} placeholder='First Name' />
                            <input name='lastName' className='form-control' value={lastName} onChange={this.handleChange} placeholder='Last Name' />
                            <input name='email' className='form-control' value={email} onChange={this.handleChange} type='email' placeholder='Email' />
                            <input name='password' className='form-control' value={password} onChange={this.handleChange} type='password' placeholder='Email' />
                            <input name='phone' className='form-control' value={phone} onChange={this.handleChange} type='phone' placeholder='Phone No.' />
                            <input name='city' className='form-control' value={city} onChange={this.handleChange} placeholder='City' />
                            <input name='age' className='form-control' value={age} onChange={this.handleChange} type='number' placeholder='Age' />
                            <input name='schoolName' className='form-control' value={schoolName} onChange={this.handleChange} placeholder='School Name' />
                            <input name='schoolGrade' className='form-control' value={schoolGrade} onChange={this.handleChange} placeholder='School Grade' />
                            <input name='collegeName' className='form-control' value={collegeName} onChange={this.handleChange} placeholder='College Name' />
                            <input name='collegeGrade' className='form-control' value={collegeGrade} onChange={this.handleChange} placeholder='College Grade' />
                            <input name='universityName' className='form-control' value={universityName} onChange={this.handleChange} placeholder='University Name' />
                            <input name='universityGrade' className='form-control' value={universityGrade} onChange={this.handleChange} placeholder='University Grade' />
                            <input className='btn btn-warning' type='submit' value='Update Details' />
                        </form>
                    </div>
                    <div id="vacancies" className="tab-pane fade">
                        {
                            vacancies.map((vacancy, index) => 
                                <div key={index} className='vacancy'>
                                    <h3>{vacancy.name} | ({vacancy.companyName})</h3>
                                    <h4>{vacancy.companyEmail} | {vacancy.companyNo}</h4>
                                    <h4>Qualification: {vacancy.qualification}</h4>
                                    <h4>Designation: {vacancy.designation}</h4>
                                    <h4>Salary: {vacancy.salary}</h4>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Student;
