import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React from 'react';
import DocAppoint from '../components/DocAppoint';

const DocAppointment = () => {

    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBCol>
                    <h3>Appointments</h3>
                </MDBCol>
            </MDBRow>
            <MDBRow className='mt-3 justify-content-center'>
                <MDBCol md='8'>
                    <DocAppoint />
                </MDBCol>
            </MDBRow>
            <MDBRow className='mt-3 justify-content-center'>
                <MDBCol md='8'>
                    <DocAppoint />
                </MDBCol>
            </MDBRow>
            <MDBRow className='mt-3 justify-content-center'>
                <MDBCol md='8'>
                    <DocAppoint />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default DocAppointment;