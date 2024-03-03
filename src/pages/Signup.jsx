import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInputGroup, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        isDoctor: false,
        address: ''
    });
    const [passwordMatchError, setPasswordMatchError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setFormData({ ...formData, isDoctor: checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatchError('Passwords do not match');
            return;
        }
        setPasswordMatchError('');
        console.log(formData);
    };

    return (
        <MDBContainer className="py-4">
            <MDBRow className="justify-content-center">
                <MDBCol md="5">
                    <form onSubmit={handleSubmit}>
                        <MDBRow className="mb-4" >
                            <MDBCol size="auto" md='3'>
                                <label htmlFor="firstName" className="col-form-label">First name</label>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    className='form-control' type='text'
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4" >
                            <MDBCol size="auto" md='3'>
                                <label htmlFor="lastName" className="col-form-label">Last name</label>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    className='form-control' type='text'
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4" >
                            <MDBCol size="auto" md='3'>
                                <label htmlFor="email" className="col-form-label">email</label>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    className='form-control' type='email'
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4" >
                            <MDBCol size="auto" md='3'>
                                <label htmlFor="password" className="col-form-label">password</label>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    className={`form-control ${passwordMatchError && 'is-invalid'}`}
                                    type='password'
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4" >
                            <MDBCol size="auto" md='3'>
                                <label htmlFor="confirmPassword" className="col-form-label">Confirm</label>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    className={`form-control ${passwordMatchError && 'is-invalid'}`}
                                    type='password'
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-5" >
                            <MDBCol size="auto" md='3'>
                                <label htmlFor="phone" className="col-form-label">phone</label>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    className='form-control' type='tel'
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4">
                            <MDBCol>
                                <MDBCheckbox
                                    name='flexCheck'
                                    value=''
                                    id='flexCheckDefault'
                                    label='Are you a dentist ?'
                                    onChange={handleCheckboxChange}
                                    checked={formData.isDoctor}
                                />
                            </MDBCol>
                        </MDBRow>
                        {formData.isDoctor && ( // Conditionally render address input field
                            <MDBRow className="mb-4">
                                <MDBCol size="auto" md='3'>
                                    <label htmlFor="address" className="col-form-label">Address</label>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput
                                        className='form-control'
                                        type='text'
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required={formData.isDoctor} // Make address required only for doctors
                                    />
                                </MDBCol>
                            </MDBRow>
                        )}
                        <div className="d-grid gap-2">
                            <input className="btn btn-primary" type="submit" value="Submit"></input>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Signup;