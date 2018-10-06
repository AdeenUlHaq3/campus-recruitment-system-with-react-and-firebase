import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';
import './EditStudent.css';

class EditStudent extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            city: '',
            age: '',
            schoolName: '',
            schoolGrade: '',
            collegeName: '',
            collegeGrade: '',
            universityName: '',
            universityGrade: ''
        }
    }

    componentDidMount() {
        const key = new URL(window.location.href).searchParams.get('key');
        
        if(!key)
         return;

        firebase.database().ref(`Users/${key}`)
        .once('value', snapshot => {
            const student = snapshot.val();
            this.setState({
                keyForStudentUpdate: key,
                firstName: student.firstName || '',
                lastName: student.lastName || '',
                age: student.age || '',
                city: student.city || '',
                phone: student.phone || '',
                schoolName: student.schoolName || '',
                schoolGrade: student.schoolGrade || '',
                collegeName: student.collegeName || '',
                collegeGrade: student.collegeGrade || '',
                universityName: student.universityName || '',
                universityGrade: student.universityGrade || ''
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateStudent = (e) => {
        e.preventDefault();
        const { 
            keyForStudentUpdate, 
            firstName,
            lastName,
            phone,
            age,
            city,
            schoolName,
            schoolGrade,
            collegeName,
            collegeGrade,
            universityName,
            universityGrade
        } = this.state;

       firebase.database().ref(`Users/${keyForStudentUpdate}`)
        .update({
            firstName,
            lastName,
            phone,
            age,
            city,
            schoolName,
            schoolGrade,
            collegeName,
            collegeGrade,
            universityName,
            universityGrade
        }) 
        .then(() => {
            swal('Updated', 'Student is updated successfully', 'success');
        })
    }

    render() {
        const {
            firstName,
            lastName,
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

        return (
            <form id='edit-student' onSubmit={this.updateStudent}>
                <h1>Edit Student</h1>
                <input name='firstName' className='form-control' value={firstName} onChange={this.handleChange} placeholder='First Name' />
                <input name='lastName' className='form-control' value={lastName} onChange={this.handleChange} placeholder='Last Name' />
                <input name='phone' className='form-control' value={phone} onChange={this.handleChange} type='phone' placeholder='Phone No.' />
                <input name='city' className='form-control' value={city} onChange={this.handleChange} placeholder='City' />
                <input name='age' className='form-control' value={age} onChange={this.handleChange} type='number' placeholder='Age' />
                <input name='schoolName' className='form-control' value={schoolName} onChange={this.handleChange} placeholder='School Name' />
                <input name='schoolGrade' className='form-control' value={schoolGrade} onChange={this.handleChange} placeholder='School Grade' />
                <input name='collegeName' className='form-control' value={collegeName} onChange={this.handleChange} placeholder='College Name' />
                <input name='collegeGrade' className='form-control' value={collegeGrade} onChange={this.handleChange} placeholder='College Grade' />
                <input name='universityName' className='form-control' value={universityName} onChange={this.handleChange} placeholder='University Name' />
                <input name='universityGrade' className='form-control' value={universityGrade} onChange={this.handleChange} placeholder='University Grade' />
                <input className='btn btn-warning' type='submit' value='Update Student' />
            </form>
        );
    }
}

export default EditStudent;