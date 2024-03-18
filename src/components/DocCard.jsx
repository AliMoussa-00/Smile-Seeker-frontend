/* eslint-disable react/prop-types */
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DocCard = ({ doctor }) => {
    const [picture, setPicture] = useState(null)

    useEffect(() => {
        const fetchImage = async (doc_id) => {
            if (doc_id) {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/api/v1/image/${doc_id}`);
                    if (!response.ok) {
                        console.log('Failed to fetch image');
                    }
                    const blob = await response.blob();
                    const objectUrl = URL.createObjectURL(blob);
                    setPicture(objectUrl);
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
        };

        fetchImage(doctor.id)
    }, [doctor.id]);

    return (
        <div className="d-sm-flex justify-content-center">
            <Link to={`/doctor/${doctor.id}`} state={doctor} className="text-decoration-none" >
                <MDBCard
                    style={{ width: '350px' }}
                >
                    <MDBRow className='g-0 justify-content-center'>
                        <MDBCol >
                            <MDBCardImage
                                src={
                                    picture
                                        ? picture
                                        : 'https://mdbootstrap.com/img/new/standard/city/062.webp'
                                }
                                alt='...'
                                fluid className="img-fluid"
                                loading='lazy'
                                style={{ objectFit: 'contain', height: '150px' }}
                            />
                        </MDBCol>
                        <MDBCol style={{ minWidth: '200px' }}>
                            <MDBCardBody className="pe-2">
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
