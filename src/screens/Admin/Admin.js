import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            firstNameStudent: '',
            lastNameStudent: '',
            emailStudent: '',
            phoneStudent: '',
            passwordStudent: '',
            ageStudent: '',
            cityStudent: '',
            schoolNameStudent: '',
            schoolGradeStudent: '',
            collegeNameStudent: '',
            collegeGradeStudent: '',
            universityNameStudent: '',
            universityGradeStudent: '',
            isVacanyPage: false,
            students: [],
            companies: [],
            vacancies: [],
            isStudentUpdate: false,
            isCompanyUpdate: false,
            isVacancyUpdate: false
        }
    }

    componentWillMount() {
        swal('Signed In', 'Welcome Admin', 'success');
        const {
            students,
            companies
        } = this.state;

        firebase.database().ref('students')
        .on('child_added', student => {
            students.push({ val: student.val(), key: student.key });
            this.setState({ students });
        })

        firebase.database().ref('companies')
        .on('child_added', company => {
            companies.push({ val: company.val(), key: company.key });
            this.setState({ company });
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showVacancies = (key) => {
        const vacancies = [];

        firebase.database().ref(`companies/${key}/vacancies`)
        .on('child_added', vacancy => {
            vacancies.push({ val: vacancy.val(), key: vacancy.key, companyKey: key });
            this.setState({
                vacancies,
                isVacanyPage: true
            });
        })
    }

    fetchVacancyForUpdate = (index, key, companyKey) => {
        firebase.database().ref(`companies/${companyKey}/vacancies/${key}`)
        .once('value', snapshot => {
            var vacancy = snapshot.val();
            
            this.setState({
                companyKeyForUpdateVacancy: companyKey,
                vacancyKey: key,
                indexForVacancyUpdate: index,
                vacancyName: vacancy.name,
                vacancyCompanyName: vacancy.companyName,
                vacancyCompanyEmail: vacancy.companyEmail,
                vacancyCompanyNo: vacancy.companyNo,
                vacancyQualification: vacancy.qualification,
                vacancyDesignation: vacancy.designation,
                vacancySalary: vacancy.salary,
                isVacancyUpdate: true
            })
        })
    }

    updateVacancy = (e) => {
        e.preventDefault();
        const { 
            companyKeyForUpdateVacancy, 
            vacancyKey,
            indexForVacancyUpdate,
            vacancyName,
            vacancyCompanyName,
            vacancyCompanyEmail,
            vacancyCompanyNo,
            vacancyQualification,
            vacancyDesignation,
            vacancySalary,
            vacancies
        } = this.state;

        const updatedVacancy = {
            name: vacancyName,
            companyName: vacancyCompanyName,
            companyEmail: vacancyCompanyEmail,
            companyNo: vacancyCompanyNo,
            qualification: vacancyQualification,
            designation: vacancyDesignation,
            salary: vacancySalary
        }
        
        firebase.database().ref(`companies/${companyKeyForUpdateVacancy}/vacancies/${vacancyKey}`)
        .update(updatedVacancy) 
        .then(() => {
            vacancies.splice(indexForVacancyUpdate, 1, {val: updatedVacancy, key: vacancyKey, companyKey: companyKeyForUpdateVacancy});
            swal('Updated', 'Vacancy is updated successfully', 'success');
            this.setState({
                vacancies,
                isVacancyUpdate: false,
            })
        })
    }

    deleteVacancy = (index, key, companyKey) => {
        const { vacancies } = this.state;
        swal({
            title: "Are you sure you you want to delete this vacancy?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    firebase.database().ref(`companies/${companyKey}/vacancies/${key}`)
                        .remove()
                        .then(() => {
                            vacancies.splice(index, 1);
                            this.setState({ vacancies });
                        })
                    swal("Poof! Your record has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your record is safe!");
                }
            });
    }

    deleteStudent = (index, key) => {
        const {
            students
        } = this.state;

        swal({
            title: "Are you sure you you want to delete this student?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                firebase.database().ref(`students/${key}`)
                    .remove()
                    .then(() => {
                        students.splice(index, 1);
                        this.setState({ students });
                    })
                swal("Poof! Your record has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your record is safe!");
            }
        });
    }

    fetchStudentForUpdate = (index, key) => {
        firebase.database().ref(`students/${key}`)
        .once('value', snapshot => {
            var student = snapshot.val();
            this.setState({
                keyForStudentUpdate: key,
                indexForStudentUpdate: index,
                firstNameStudent: student.firstName,
                lastNameStudent: student.lastName,
                emailStudent: student.email,
                passwordStudent: student.password,
                ageStudent: student.age || '',
                cityStudent: student.city || '',
                phoneStudent: student.phone || '',
                schoolNameStudent: student.schoolName || '',
                schoolGradeStudent: student.schoolGrade || '',
                collegeNameStudent: student.collegeName || '',
                collegeGradeStudent: student.collegeGrade || '',
                universityNameStudent: student.universityName || '',
                universityGradeStudent: student.universityGrade || '',
                isStudentUpdate: true
            })
        })
    }

    updateStudent = (e) => {
        e.preventDefault();
        const { 
            keyForStudentUpdate, 
            indexForStudentUpdate,
            firstNameStudent,
            lastNameStudent,
            emailStudent,
            phoneStudent,
            passwordStudent,
            ageStudent,
            cityStudent,
            schoolNameStudent,
            schoolGradeStudent,
            collegeNameStudent,
            collegeGradeStudent,
            universityNameStudent,
            universityGradeStudent,
            students
        } = this.state;

        const updatedStudent = {
            firstName: firstNameStudent,
            lastName: lastNameStudent,
            email: emailStudent,
            phone: phoneStudent,
            password: passwordStudent,
            age: ageStudent,
            city: cityStudent,
            schoolName: schoolNameStudent,
            schoolGrade: schoolGradeStudent,
            collegeName: collegeNameStudent,
            collegeGrade: collegeGradeStudent,
            universityName: universityNameStudent,
            universityGrade: universityGradeStudent
        }

        firebase.database().ref(`students/${keyForStudentUpdate}`)
        .update(updatedStudent) 
        .then(() => {
            students.splice(indexForStudentUpdate, 1, {val: updatedStudent, key: keyForStudentUpdate});
            swal('Updated', 'Student is updated successfully', 'success');
            this.setState({
                students,
                isStudentUpdate: false
            })
        })
    }

    deleteCompany = (index, key) => {
        const { companies } = this.state;
        swal({
            title: "Are you sure you you want to delete this company?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    firebase.database().ref(`companies/${key}`)
                        .remove()
                        .then(() => {
                            companies.splice(index, 1);
                            this.setState({ companies });
                        })
                    swal("Poof! Your record has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your record is safe!");
                }
            });
    }

    fetchCompanyForUpdate = (index, key) => {
        firebase.database().ref(`companies/${key}`)
        .once('value', snapshot => {
            var company = snapshot.val();
            this.setState({
                keyForCompanyUpdate: key,
                indexForCompanyUpdate: index,
                nameCompany: company.name,
                emailCompany: company.email,
                passwordCompany: company.password,
                phoneCompany: company.phone,
                isCompanyUpdate: true
            })
        })
    }

    updateCompany = (e) => {
        e.preventDefault();
        const { 
            keyForCompanyUpdate, 
            indexForCompanyUpdate,
            nameCompany,
            emailCompany,
            phoneCompany,
            passwordCompany,
            companies
        } = this.state;
        
        const updatedCompany = {
            name: nameCompany,
            email: emailCompany,
            phone: phoneCompany,
            password: passwordCompany,
        }

        firebase.database().ref(`companies/${keyForCompanyUpdate}`)
        .update(updatedCompany) 
        .then(() => {
            companies.splice(indexForCompanyUpdate, 1, {val: updatedCompany, key: keyForCompanyUpdate});
            swal('Updated', 'Company is updated successfully', 'success');
            this.setState({
                companies,
                isCompanyUpdate: false
            })
        })
    }

    render() {
        const {
            firstNameStudent,
            lastNameStudent,
            emailStudent,
            phoneStudent,
            passwordStudent,
            ageStudent,
            cityStudent,
            schoolNameStudent,
            schoolGradeStudent,
            collegeNameStudent,
            collegeGradeStudent,
            universityNameStudent,
            universityGradeStudent,
            students,
            nameCompany,
            emailCompany,
            passwordCompany,
            phoneCompany,
            companies,
            vacancies,
            isVacanyPage,
            isStudentUpdate,
            isCompanyUpdate,
            isVacancyUpdate,
            vacancyName,
            vacancyCompanyName,
            vacancyCompanyEmail,
            vacancyCompanyNo,
            vacancyQualification,
            vacancyDesignation,
            vacancySalary
        } = this.state;
        
        const {
            logOut
        } = this.props.Admin;
        
        return (
            <div className='container admin'>
                <input className='btn btn-success' type='button' value='Logout' onClick={logOut} />
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#student">Student</a></li>
                    <li><a data-toggle="tab" href="#company">Company</a></li>
                </ul>

                <div className="tab-content">
                    <div id="student" className="tab-pane fade in active">
                        {
                            isStudentUpdate
                            ?
                            <form onSubmit={this.updateStudent}>
                                <h1>Edit Student</h1>
                                <input name='firstNameStudent' className='form-control' value={firstNameStudent} onChange={this.handleChange} placeholder='First Name' />
                                <input name='lastNameStudent' className='form-control' value={lastNameStudent} onChange={this.handleChange} placeholder='Last Name' />
                                <input name='emailStudent' className='form-control' value={emailStudent} onChange={this.handleChange} type='email' placeholder='Email' />
                                <input name='passwordStudent' className='form-control' value={passwordStudent} onChange={this.handleChange} type='password' placeholder='Email' />
                                <input name='phoneStudent' className='form-control' value={phoneStudent} onChange={this.handleChange} type='phone' placeholder='Phone No.' />
                                <input name='cityStudent' className='form-control' value={cityStudent} onChange={this.handleChange} placeholder='City' />
                                <input name='ageStudent' className='form-control' value={ageStudent} onChange={this.handleChange} type='number' placeholder='Age' />
                                <input name='schoolNameStudent' className='form-control' value={schoolNameStudent} onChange={this.handleChange} placeholder='School Name' />
                                <input name='schoolGradeStudent' className='form-control' value={schoolGradeStudent} onChange={this.handleChange} placeholder='School Grade' />
                                <input name='collegeNameStudent' className='form-control' value={collegeNameStudent} onChange={this.handleChange} placeholder='College Name' />
                                <input name='collegeGradeStudent' className='form-control' value={collegeGradeStudent} onChange={this.handleChange} placeholder='College Grade' />
                                <input name='universityNameStudent' className='form-control' value={universityNameStudent} onChange={this.handleChange} placeholder='University Name' />
                                <input name='universityGradeStudent' className='form-control' value={universityGradeStudent} onChange={this.handleChange} placeholder='University Grade' />
                                <input className='btn btn-warning' type='submit' value='Update Student' />
                                <input className='btn btn-default' onClick={() => this.setState({ isStudentUpdate: false })} type='button' value='Back' />
                            </form>
                            :
                            students.map((student, index) =>
                                <div key={student.key} className='studentInAdmin'>
                                    <h3>{student.val.firstName} {student.val.lastName}</h3>
                                    <h4>{student.val.email} | {student.val.phone} | {student.val.city}</h4>
                                    <h4>Age: {student.val.age}</h4>
                                    <h4>School: {student.val.schoolName} | Grade: {student.val.schoolGrade}</h4>
                                    <h4>College: {student.val.collegeName} | Grade: {student.val.collegeGrade}</h4>
                                    <h4>University: {student.val.universityName} | GPA: {student.val.universityGrade}</h4>
                                    <input className='btn btn-primary' type='button' onClick={() => this.fetchStudentForUpdate(index, student.key)} value='Edit' />
                                    <input className='btn btn-danger' type='button' onClick={() => this.deleteStudent(index, student.key)} value='Delete' />
                                </div>
                            )
                        }
                    </div>
                    <div id="company" className="tab-pane fade">
                        {
                            isVacanyPage
                            ?
                            isVacancyUpdate
                                ?
                                <form onSubmit={this.updateVacancy}>
                                    <input name='vacancyName' className='form-control' value={vacancyName} onChange={this.handleChange} required placeholder='Vacancy' />
                                    <input name='vacancyCompanyName' className='form-control' value={vacancyCompanyName} onChange={this.handleChange} required placeholder='Company Name' />
                                    <input type='email' name='vacancyCompanyEmail' className='form-control' value={vacancyCompanyEmail} onChange={this.handleChange} required placeholder='Company Email' />
                                    <input type='phone' name='vacancyCompanyNo' className='form-control' value={vacancyCompanyNo} onChange={this.handleChange} required placeholder='Company No.' />
                                    <input name='vacancyQualification' className='form-control' value={vacancyQualification} onChange={this.handleChange} required placeholder='Qualification' />
                                    <input name='vacancyDesignation' className='form-control' value={vacancyDesignation} onChange={this.handleChange} required placeholder='Designation' />
                                    <input type='number' name='vacancySalary' className='form-control' value={vacancySalary} onChange={this.handleChange} required placeholder='Salary' />
                                    <input className='btn btn-warning' type='submit' value='Update Vacancy' />
                                    <input className='btn btn-default' onClick={() => this.setState({ isVacancyUpdate: false })} type='button' value='Back' />
                                </form>
                                :
                                <div>
                                <h1>Vacancies</h1>
                                <input className='btn btn-default' onClick={() => this.setState({ isVacanyPage: false })} type='button' value='Back' />
                                {
                                    vacancies.map((vacancy, index) =>
                                        <div key={vacancy.key} className='vacancyInAdmin'>
                                            <h3>{vacancy.val.name} | ({vacancy.val.companyName})</h3>
                                            <h4>{vacancy.val.companyEmail} | {vacancy.val.companyNo}</h4>
                                            <h4>Qualification: {vacancy.val.qualification}</h4>
                                            <h4>Designation: {vacancy.val.designation}</h4>
                                            <h4>Salary: {vacancy.val.salary}</h4>
                                            <input className='btn btn-primary' type='button' onClick={() => this.fetchVacancyForUpdate(index, vacancy.key, vacancy.companyKey)} value='Edit' />
                                            <input className='btn btn-danger' type='button' onClick={() => this.deleteVacancy(index, vacancy.key, vacancy.companyKey)} value='Delete' />
                                        </div>
                                    )
                                }
                                </div>
                            :
                            isCompanyUpdate
                            ?
                            <form onSubmit={this.updateCompany}>
                                <h1>Edit Company</h1>
                                <input name='nameCompany' required value={nameCompany} className='form-control' onChange={this.handleChange} placeholder='Company Name' />
                                <input name='phoneCompany' required value={phoneCompany} className='form-control' onChange={this.handleChange} type='phone' placeholder='Phone No.' />
                                <input name='emailCompany' required value={emailCompany} className='form-control' onChange={this.handleChange} type='email' placeholder='Email' />
                                <input name='passwordCompany' required value={passwordCompany} className='form-control' onChange={this.handleChange} type='password' placeholder='Password' />
                                <input className='btn btn-warning' type='submit' value='Update Company' />
                                <input className='btn btn-default' onClick={() => this.setState({ isCompanyUpdate: false })} value='Back' />
                            </form>
                            :
                            companies.map((company, index) =>
                                <div key={company.key} className='companyInAdmin'>
                                    <h3>{company.val.name}</h3>
                                    <h4>{company.val.email}</h4>
                                    <h4>{company.val.phone}</h4>
                                    <input className='btn btn-success' type='button' onClick={() => this.showVacancies(company.key)} value='Vacancies' />
                                    <input className='btn btn-primary' type='button' onClick={() => this.fetchCompanyForUpdate(index, company.key)} value='Edit' />
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

export default Admin;
