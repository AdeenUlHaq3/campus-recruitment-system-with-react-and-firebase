import React, { Component } from 'react';
import firebase from 'firebase';
import './AppliedStudents.css';

class AppliedStudents extends Component {
    constructor() {
        super();
        
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        const {
            students 
        } = this.state;

        const {
            studentUIds
        } = this.props.location;

        if(studentUIds)
            studentUIds.map(studentUId => {
                firebase.database().ref(`Users/${studentUId}`)
                .once('value', student => {
                    if(student.val())
                        students.push({key: student.key, val: student.val()});
                })
                .then(() => {
                    this.setState({ students });
                })
            })
    }

    render() {
        const {
            students
        } = this.state;
        
        return (
            <div className='col-md-12' id="students">
                <h1>Applied Students</h1>
                {
                    students.map(student => 
                        <div key={student.key} className='appliedStudents'>
                            <h3>{student.val.firstName} {student.val.lastName}</h3>
                            <h4>{student.val.email} | {student.val.phone} | {student.val.city}</h4>
                            <h4>Age: {student.val.age}</h4>
                            <h4>School: {student.val.schoolName} | Grade: {student.val.schoolGrade}</h4>
                            <h4>College: {student.val.collegeName} | Grade: {student.val.collegeGrade}</h4>
                            <h4>University: {student.val.universityName} | GPA: {student.val.universityGrade}</h4>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default AppliedStudents;