/* eslint-disable react/prop-types */
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const DocCard = ({ doctor }) => {
    
    return (
        <div className="d-sm-flex justify-content-center">
            <Link to={`/doctor/${doctor.id}`} state={doctor} >
                <MDBCard
                    style={{ maxWidth: '540px' }}
                >
                    <MDBRow className='g-0'>
                        <MDBCol >
                            <MDBCardImage
                                src='https://mdbootstrap.com/img/new/standard/city/062.webp'
                                alt='...'
                                fluid className="img-fluid h-100"
                            />
                        </MDBCol>
                        <MDBCol style={{ minWidth: '200px' }}>
                            <MDBCardBody className="pe-3">
                                <MDBCardTitle>{`${doctor.last_name} ${doctor.first_name}`}</MDBCardTitle>
                                <MDBCardText className="fs-6">
                                    <small className='text-muted'>{`email: ${doctor.email}`}</small><br />
                                    <small className='text-muted'>{`phone: ${doctor.phone}`}</small>
                                </MDBCardText>
                                <MDBCardText>
                                    <small className='text-muted'>available</small>
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </Link>
        </div>
    );
};

export default DocCard;