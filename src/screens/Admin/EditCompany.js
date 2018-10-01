import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';

class EditCompany extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            phone: ''
        }
    }

    componentDidMount() {
        const key = new URL(window.location.href).searchParams.get('key');

        if (!key)
            return;

        firebase.database().ref(`Users/${key}`)
            .once('value', snapshot => {
                const company = snapshot.val();
                this.setState({
                    keyForCompanyUpdate: key,
                    name: company.name || '',
                    phone: company.phone || '',
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateCompany = (e) => {
        e.preventDefault();
        const {
            keyForCompanyUpdate,
            name,
            phone
        } = this.state;

        firebase.database().ref(`Users/${keyForCompanyUpdate}`)
            .update({
                name,
                phone
            })
            .then(() => {
                swal('Updated', 'Company is updated successfully', 'success');
            })
    }

    render() {
        const {
            name,
            phone,
        } = this.state;

        return (
            <form onSubmit={this.updateCompany}>
                <h1>Edit Company</h1>
                <input name='name' required value={name} className='form-control' onChange={this.handleChange} placeholder='Company Name' />
                <input name='phone' required value={phone} className='form-control' onChange={this.handleChange} type='phone' placeholder='Phone No.' />
                <input className='btn btn-warning' type='submit' value='Update Company' />
            </form>
        );
    }
}

export default EditCompany;