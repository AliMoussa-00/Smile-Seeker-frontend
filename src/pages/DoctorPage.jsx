
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DocMap from '../components/DocMap';

const DoctorPage = () => {
    const location = useLocation();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        const doctorData = location.state;
        setDoctor(doctorData);
    }, [location.state]);

    return (
        <MDBContainer className="py-4">
            <MDBRow>
                <MDBCol md="3" className='d-flex align-items-center'>
                    <MDBCard >
                        <MDBCardImage
                            src='https://mdbootstrap.com/img/new/standard/city/062.webp'
                            className="card-img-top" alt="Doctor" />
                    </MDBCard>
                </MDBCol>
                <MDBCol md="8">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle className="text-center">
                                {`${doctor?.first_name} ${doctor?.last_name}`}
                            </MDBCardTitle>
                            <MDBCardText>
                                <p>Email: {doctor?.email}</p>
                                <p>Phone: {doctor?.phone}</p>
                                <p>Lorem, ipsum dolor sit a met consectetur adipisicing elit. Necessitatibus asperiores sequi animi quas, numquam sint quae assumenda repellendus facilis molestiae. Quasi vitae ipsam rem repudiandae velit nesciunt non, sapiente quibusdam.</p>
                                <p>address: Lorem, ipsum dolor sit a met consectetur</p>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow className='mt-5'>
                <MDBCol>
                    <h3>Location</h3>
                </MDBCol>
            </MDBRow>
            <MDBRow className='d-flex justify-content-center'>
                <MDBCol md='8'>
                    <DocMap />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default DoctorPage;