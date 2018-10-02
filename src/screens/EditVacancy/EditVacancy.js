import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';

class EditVacacny extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            companyName: '',
            companyEmail: '',
            companyNo: '',
            qualification: '',
            designation: '',
            salary: ''
        }
    }

    componentDidMount() {
        const key = new URL(window.location.href).searchParams.get('key');
        const companyKey = new URL(window.location.href).searchParams.get('companyKey');

        if (!key)
            return;

        firebase.database().ref(`Users/${companyKey}/vacancies/${key}`)
            .once('value', snapshot => {
                const vacancy = snapshot.val();
                this.setState({
                    companyKeyForVacancyUpdate: companyKey,
                    keyForVacancyUpdate: key,
                    name: vacancy.name || '',
                    companyName: vacancy.companyName || '',
                    companyEmail: vacancy.companyEmail || '',
                    companyNo: vacancy.companyNo || '',
                    qualification: vacancy.qualification,
                    designation: vacancy.designation,
                    salary: vacancy.salary
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateVacancy = (e) => {
        e.preventDefault();
        const {
            keyForVacancyUpdate,
            companyKeyForVacancyUpdate,
            name,
            companyName,
            companyEmail,
            companyNo,
            qualification,
            designation,
            salary
        } = this.state;

        firebase.database().ref(`Users/${companyKeyForVacancyUpdate}/vacancies/${keyForVacancyUpdate}`)
            .update({
                name,
                companyName,
                companyEmail,
                companyNo,
                qualification,
                designation,
                salary
            })
            .then(() => {
                swal('Updated', 'Vacancy is updated successfully', 'success');
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
            salary
        } = this.state;

        return (
            <form onSubmit={this.updateVacancy}>
                <h1>Edit Vacancy</h1>
                <input name='name' className='form-control' value={name} onChange={this.handleChange} required placeholder='Vacancy' />
                <input name='companyName' className='form-control' value={companyName} onChange={this.handleChange} required placeholder='Company Name' />
                <input type='email' name='companyEmail' className='form-control' value={companyEmail} onChange={this.handleChange} required placeholder='Company Email' />
                <input type='phone' name='companyNo' className='form-control' value={companyNo} onChange={this.handleChange} required placeholder='Company No.' />
                <input name='qualification' className='form-control' value={qualification} onChange={this.handleChange} required placeholder='Qualification' />
                <input name='designation' className='form-control' value={designation} onChange={this.handleChange} required placeholder='Designation' />
                <input type='number' name='salary' className='form-control' value={salary} onChange={this.handleChange} required placeholder='Salary' />
                <input className='btn btn-warning' type='submit' value='Update Vacancy' />
            </form>
        );
    }
}

export default EditVacacny;