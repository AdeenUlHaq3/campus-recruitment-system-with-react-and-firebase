import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';
import './ShowVacancies.css';

class ShowVacancies extends Component {
    constructor() {
        super();
        this.state = {
            vacancies: []
        }
    }

    componentDidMount() {
        const key = new URL(window.location.href).searchParams.get('key');
        const {
            vacancies
        } = this.state;

        if (!key)
            return;

        firebase.database().ref(`Users/${key}/vacancies`)
            .on('child_added', vacancy => {
                vacancies.push({ val: vacancy.val(), key: vacancy.key, companyKey: key });
                this.setState({
                    vacancies
                });
            })
    }

    redirectToEditVacancyPage = (key, companyKey) => {
        this.props.history.push(`/editVacancy?key=${key}&companyKey=${companyKey}`);
    }

    deleteVacancy = (index, key, companyKey) => {
        const {
            vacancies
        } = this.state;

        swal({
            title: "Are you sure you you want to delete this vacancy?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    firebase.database().ref(`Users/${companyKey}/vacancies/${key}`)
                        .remove()
                        .then(() => {
                            vacancies.splice(index, 1);
                            swal("Poof! Your record has been deleted!", {
                                icon: "success",
                            });
                            this.setState({ vacancies });
                        })
                } else {
                    swal("Your record is safe!");
                }
            });
    }

    render() {
        const {
            vacancies
        } = this.state;

        return (
            <div className='col-md-12' id='show-vacancies'>
                <div>
                    <h1>Vacancies</h1>
                    {
                        vacancies.map((vacancy, index) =>
                            <div key={vacancy.key} className='vacancyInAdmin'>
                                <h3>
                                    {vacancy.val.name} | ({vacancy.val.companyName})
                                    <button className='fa fa-edit' onClick={() => this.redirectToEditVacancyPage(vacancy.key, vacancy.companyKey)}></button>
                                    <button className='fa fa-trash' onClick={() => this.deleteVacancy(index, vacancy.key, vacancy.companyKey)}></button>
                                </h3>
                                <h4>{vacancy.val.companyEmail} | {vacancy.val.companyNo}</h4>
                                <h4>Qualification: {vacancy.val.qualification}</h4>
                                <h4>Designation: {vacancy.val.designation}</h4>
                                <h4>Salary: {vacancy.val.salary}</h4>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default ShowVacancies;